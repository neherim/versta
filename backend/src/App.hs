{-# LANGUAGE ConstraintKinds            #-}
{-# LANGUAGE FlexibleContexts           #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

module App where

import           Control.Concurrent.MVar
import           Control.Monad.Logger
import           Control.Monad.Reader
import           Effect.HttpService
import           Effect.SchemaStorage
import           Network.HTTP.Client     (Manager)
import           Servant                 (Handler)
import           Types.Config
import           Types.Schema

data AppContext =
  AppContext
    { ctxConfig      :: AppConfig
    , ctxHttpManager :: Manager
    , ctxSchema      :: MVar ProjectSchema
    }

newtype AppM a =
  AppM
    { runAppM :: ReaderT AppContext (LoggingT Handler) a
    }
  deriving (Monad, Functor, Applicative, MonadIO, MonadReader AppContext, MonadLogger)

instance HasSchema AppM where
  getSchema = asks ctxSchema >>= (liftIO . readMVar)
  modifySchema f = do
    schemaMVar <- asks ctxSchema
    schemaFileName <- asks (configFile . configSchema . ctxConfig)
    liftIO $ modifyAndStore schemaFileName schemaMVar f

{-  getSchema = do
    schemaMVar <- asks ctxSchema
    liftIO $ readMVar schemaMVar-}
instance HttpGet AppM where
  httpGetEntity url = do
    manager <- asks ctxHttpManager
    makeHttpGet manager url
