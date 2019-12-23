{-# LANGUAGE StrictData #-}
{-# LANGUAGE DeriveGeneric #-}
module Types.Schema where

import Data.Text
import GHC.Generics
import Data.Aeson
import Data.UUID.V4 (nextRandom)
import Data.UUID

data Schema = Schema {
  schemaId :: UUID,
  schemaServices :: [ServiceSchema]
  } deriving (Show, Generic)

data ServiceSchema = ServiceSchema {
  serviceTitle :: Text,
  serviceDescription :: Maybe Text
  } deriving (Show, Generic)

instance ToJSON Schema
instance ToJSON ServiceSchema

emptySchema :: IO Schema
emptySchema = do
  uuid <- nextRandom
  return $ Schema uuid []
