{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE StrictData #-}
module App.Config where

import Data.Text
import GHC.Generics
import Data.Yaml
import Data.HashMap.Strict
import Control.Monad.IO.Class

data ServiceEndpoints = ServiceEndpoints {
  swagger :: Text
  } deriving (Show, Generic)

data AppConfig = AppConfig {
  port :: Int,
  services :: HashMap Text ServiceEndpoints
} deriving (Show, Generic)


instance FromJSON ServiceEndpoints
instance FromJSON AppConfig


loadConfig :: MonadIO m => FilePath -> m AppConfig
loadConfig = decodeFileThrow
