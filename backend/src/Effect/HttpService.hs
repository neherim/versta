{-# LANGUAGE FlexibleContexts #-}
module Effect.HttpService where

import Data.Text (Text, unpack)
import Network.HTTP.Client (HttpException, Manager, parseUrlThrow, newManager, defaultManagerSettings)
import Network.HTTP.Simple (httpJSON, setRequestManager, getResponseBody)
import Control.Monad.Catch (try, handle, Exception, SomeException, MonadThrow, throwM)
import Control.Monad.Trans
import Data.Aeson (FromJSON)

type URL = Text

newtype HttpError = HttpError String
  deriving (Show)


instance Exception HttpError

class HttpGet m where
  httpGetEntity :: (FromJSON a) => URL -> m (Either HttpError a)


toHttpError :: SomeException -> HttpError
toHttpError ex = HttpError (show ex)

makeRequest :: (FromJSON a, MonadThrow m, MonadIO m) => Manager -> URL -> m a
makeRequest manager url = do
  request  <- setRequestManager manager <$> parseUrlThrow (unpack url)
  response <- httpJSON request
  return $ getResponseBody response

makeHttpGet :: (FromJSON a, MonadIO m) => Manager -> URL -> m (Either HttpError a)
makeHttpGet manager url = (liftIO . try . wrapException) $ makeRequest manager url
  where
    wrapException = handle (throwM . toHttpError)

makeHttpGet' :: (FromJSON a, MonadIO m) => URL -> m (Either HttpError a)
makeHttpGet' url = do
  manager <- liftIO $ newManager defaultManagerSettings
  makeHttpGet manager url


