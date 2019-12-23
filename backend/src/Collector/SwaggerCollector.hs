module Collector.SwaggerCollector where

import Control.Lens
import Types.Schema
import Data.Swagger.Lens
import Effect.HttpService
import Data.Swagger (Swagger (..))




readSchema :: (HttpGet m) => URL -> m ServiceSchema
readSchema url = undefined -- fromSwagger <$> httpGetEntity url


fromSwagger :: Swagger -> ServiceSchema
fromSwagger swagger = ServiceSchema {
  serviceTitle = swagger^.info.title,
  serviceDescription = swagger^.info.description
  }
