{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE FunctionalDependencies #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE DataKinds #-}
module Types.Lens where

import           Control.Lens
import           Types.Schema



makeFields ''ProjectSchema
makeFields ''Service
makeFields ''Port
makeFields ''Link
