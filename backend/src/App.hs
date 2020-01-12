{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
module App where

import           Control.Monad.Reader
import           Servant                                  ( Handler )
import           Data.IORef
import           Data.IORef.Extra
import           Control.Monad.Logger
import           Effect.HttpService
import           Network.HTTP.Client                      ( Manager )
import           Types.Schema
import           Types.Config

data AppContext = AppContext {
  ctxConfig :: AppConfig,
  ctxHttpManager :: Manager,
  ctxSchema :: IORef ProjectSchema
  }

newtype AppM a = AppM {
  runAppM :: ReaderT AppContext (LoggingT Handler) a
  } deriving (Monad, Functor, Applicative, MonadIO, MonadReader AppContext, MonadLogger)

instance HasSchema AppM where
  getSchema = do
    schemaRef <- asks ctxSchema
    liftIO $ readIORef schemaRef

  modifySchema f = do
    schemaRef <- asks ctxSchema
    liftIO $ atomicModifyIORef'_ schemaRef f


instance HttpGet AppM where
  httpGetEntity url = do
    manager <- asks ctxHttpManager
    makeHttpGet manager url
