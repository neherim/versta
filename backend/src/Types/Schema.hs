{-# LANGUAGE DataKinds              #-}
{-# LANGUAGE DeriveGeneric          #-}
{-# LANGUAGE FlexibleContexts       #-}
{-# LANGUAGE FlexibleInstances      #-}
{-# LANGUAGE FunctionalDependencies #-}
{-# LANGUAGE StrictData             #-}
{-# LANGUAGE TemplateHaskell        #-}
{-# LANGUAGE TypeFamilies           #-}

module Types.Schema where

import           Control.Lens
import           Control.Monad.Trans
import           Data.Aeson
import           Data.Aeson.TH               (deriveJSON)
import           Data.Swagger.Internal.Utils
import           Data.Text
import           Data.UUID
import           Data.UUID.V4                (nextRandom)
import           GHC.Generics

data Point =
  Point
    { _pointX :: Float
    , _pointY :: Float
    }
  deriving (Show, Generic)

data ProjectSchema =
  ProjectSchema
    { _projectSchemaServices :: [ServiceSchema]
    , _projectSchemaLinks    :: [LinkSchema]
    }
  deriving (Show, Generic)

data ServiceSchema =
  ServiceSchema
    { _serviceSchemaId          :: UUID
    , _serviceSchemaName        :: Text
    , _serviceSchemaPosition    :: Point
    , _serviceSchemaDescription :: Maybe Text
    , _serviceSchemaPorts       :: [PortSchema]
    }
  deriving (Show, Generic)

data PortSchema =
  PortSchema
    { _portSchemaId    :: UUID
    , _portSchemaName  :: Text
    , _portSchemaInput :: Bool
    }
  deriving (Show, Generic)

data LinkSchema =
  LinkSchema
    { _linkSchemaId     :: UUID
    , _linkSchemaFrom   :: UUID
    , _linkSchemaTo     :: UUID
    , _linkSchemaPoints :: [Point]
    }
  deriving (Show, Generic)

-- JSON instance 
deriveJSON (jsonPrefix "Point") 'Point

deriveJSON (jsonPrefix "ProjectSchema") 'ProjectSchema

deriveJSON (jsonPrefix "ServiceSchema") 'ServiceSchema

deriveJSON (jsonPrefix "PortSchema") 'PortSchema

deriveJSON (jsonPrefix "LinkSchema") 'LinkSchema

-- Lenses
makeFields ''ProjectSchema

makeFields ''ServiceSchema

makeFields ''PortSchema

makeFields ''LinkSchema

emptySchema :: ProjectSchema
emptySchema = ProjectSchema [] []

class HasSchema m where
  getSchema :: m ProjectSchema
  modifySchema :: (ProjectSchema -> ProjectSchema) -> m ()
