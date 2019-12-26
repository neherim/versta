{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

module App.Monad where

import App.Context
import Control.Monad.Reader
import Servant (Handler)
import Data.IORef
import Data.IORef.Extra
import Control.Monad.Logger

type AppContext = Context

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



