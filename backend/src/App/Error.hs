{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DerivingStrategies #-}
{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
module App.Error where

import           Control.Monad.Except                     ( MonadError )
import           Control.Exception                        ( Exception )
import           Data.Text                                ( Text )

-- | Type alias for errors.
type WithError m = (MonadError AppError m)


{- | Exception wrapper around 'AppError'. Useful when you need to throw/catch
'AppError' as 'Exception'.
-}
newtype AppException = AppException
    { unAppException :: AppError
    } deriving (Show)
      deriving anyclass (Exception)

data AppError =
      NotFound Text
    {- | Some exceptional circumstance has happened stop execution and return.
    Optional text to provide some context in server logs.
    -}
    | ServerError Text
    -- | Возникли проблемы при сохранении схемы в файл
    | SavingSchemaError Text
    | ReadSchemaError String
    deriving (Show, Eq)
