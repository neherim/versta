{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE StrictData #-}
module Types.Config where

import           Data.Text                                ( Text )
import           GHC.Generics
import           Data.Char                                ( isLower
                                                          , toLower
                                                          )
import           Data.Yaml
import           Data.Aeson.Types
import           Data.HashMap.Strict

data SchemaConfig = SchemaConfig {
    configFile :: FilePath
  } deriving (Show, Generic)

data ServiceEndpointsConfig = ServiceEndpointsConfig {
    configSwagger :: Text
  } deriving (Show, Generic)

data AppConfig = AppConfig {
    configPort :: Int
  , configServices :: HashMap Text ServiceEndpointsConfig
  , configSchema :: SchemaConfig
  } deriving (Show, Generic)


instance FromJSON SchemaConfig where
  parseJSON = genericParseJSON configParseOptions

instance FromJSON ServiceEndpointsConfig where
  parseJSON = genericParseJSON configParseOptions

instance FromJSON AppConfig where
  parseJSON = genericParseJSON configParseOptions


configParseOptions :: Options
configParseOptions = defaultOptions
  { fieldLabelModifier = capitalized . drop (length "config")
  }
 where
  capitalized :: String -> String
  capitalized []       = []
  capitalized (x : xs) = toLower x : xs