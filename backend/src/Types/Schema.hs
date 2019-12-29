{-# LANGUAGE StrictData #-}
{-# LANGUAGE DeriveGeneric #-}
module Types.Schema where

import           Data.Swagger.Internal.Utils
import           Data.Text
import           GHC.Generics
import           Data.Aeson
import           Data.UUID.V4                             ( nextRandom )
import           Data.UUID
import           Control.Monad.Trans


data ProjectSchema = ProjectSchema {
    _projectSchemaId :: UUID
  , _projectSchemaServices :: [Service]
  , _projectSchemaLinks :: [Link]
  } deriving (Show, Generic)

data Service = Service {
    _serviceId :: UUID
  , _serviceName :: Text
  , _serviceDescription :: Maybe Text
  , _serviceInPorts :: [Port]
  , _serviceOutPorts :: [Port]
  } deriving (Show, Generic)

data Port = Port {
    _portId :: UUID
  , _portName :: Text
  } deriving (Show, Generic)

data Link = Link {
    _linkId :: UUID
  , _linkFrom :: UUID
  , _linkTo :: UUID
  } deriving (Show, Generic)

-- To json instances
instance ToJSON ProjectSchema where
  toJSON = genericToJSON (jsonPrefix "ProjectSchema")

instance ToJSON Service where
  toJSON = genericToJSON (jsonPrefix "Service")

instance ToJSON Port where
  toJSON = genericToJSON (jsonPrefix "Port")

instance ToJSON Link where
  toJSON = genericToJSON (jsonPrefix "Link")

emptySchema :: (MonadIO m) => m ProjectSchema
emptySchema = do
  uuid <- liftIO nextRandom
  return $ ProjectSchema uuid [] []


class HasSchema m where
  getSchema :: m ProjectSchema
  modifySchema :: (ProjectSchema -> ProjectSchema) -> m ()
