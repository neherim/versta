{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE FunctionalDependencies #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE DataKinds #-}
module Data.AsyncApi.Lens where

import           Control.Lens
import           Data.AsyncApi.Internal
import           Data.Swagger.Internal

makeFields ''AsyncApi
makeFields ''Server
makeFields ''Channel
makeFields ''AsyncOperation
makeFields ''Message

makeFields ''Param
makeFields ''Info
makeFields ''Contact
makeFields ''License
makeFields ''Tag
makeFields ''Schema
makeFields ''NamedSchema
makeFields ''ExternalDocs

-- ** 'Referenced' prisms
makePrisms ''Referenced
