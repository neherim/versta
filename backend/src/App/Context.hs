{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
module App.Context where

import App.Config
import Network.HTTP.Client (Manager)
import Data.IORef
import Types.Schema

data AppContext = AppContext {
  ctxConfig :: AppConfig,
  ctxHttpManager :: Manager,
  ctxSchema :: IORef Schema
  }

class HasSchema m where
  getSchema :: m Schema
  modifySchema :: (Schema -> Schema) -> m ()
