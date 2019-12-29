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

data ServiceEndpointsConfig = ServiceEndpointsConfig {
  configSwagger :: Text
  } deriving (Show, Generic)

data AppConfig = AppConfig {
  configPort :: Int,
  configServices :: HashMap Text ServiceEndpointsConfig
} deriving (Show, Generic)


instance FromJSON ServiceEndpointsConfig where
  parseJSON = genericParseJSON
    $ defaultOptions { fieldLabelModifier = capitalized . dropWhile isLower }

instance FromJSON AppConfig where
  parseJSON = genericParseJSON
    $ defaultOptions { fieldLabelModifier = capitalized . dropWhile isLower }


capitalized :: String -> String
capitalized []       = []
capitalized (x : xs) = toLower x : xs
