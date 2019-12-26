{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE StrictData #-}
module App.Context where

import App.Config
import Network.HTTP.Client (Manager)
import Data.IORef
import Types.Schema

data Context = Context {
  ctxConfig :: AppConfig,
  ctxHttpManager :: Manager,
  ctxSchema :: IORef Schema
  }

class HasSchema m where
  getSchema :: m Schema
  modifySchema :: (Schema -> Schema) -> m ()
