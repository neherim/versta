{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RecordWildCards   #-}

module Lib where

import           App
import           Effect.SchemaStorage
import           Network.HTTP.Client      (Manager, defaultManagerSettings,
                                           newManager)
import           Network.Wai.Handler.Warp (run)
import           Prelude                  hiding (id)
import           Server                   (application)

import           Control.Concurrent.MVar
import           Data.Aeson               (eitherDecodeFileStrict')
import           Data.Yaml                (decodeFileThrow)
import           System.Directory         (doesFileExist)
import           Types.Config
import           Types.Schema             (ProjectSchema, emptySchema)

start :: IO ()
start = decodeFileThrow "conf.yml" >>= buildContext >>= runHttpServer

httpConnectionManager :: IO Manager
httpConnectionManager = newManager defaultManagerSettings

buildContext :: AppConfig -> IO AppContext
buildContext config = do
  let ctxConfig = config
  let schemaStorageFile = (configFile . configSchema) ctxConfig
  ctxHttpManager <- httpConnectionManager
  loadedSchema <- readProjectSchemaFromFile schemaStorageFile
  ctxSchema <- newMVar loadedSchema
  return AppContext {..}

runHttpServer :: AppContext -> IO ()
runHttpServer ctx =
  let serverPort = configPort $ ctxConfig ctx
   in run serverPort (application ctx)
