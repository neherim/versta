{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RecordWildCards #-}
module Lib (start) where

import App
import Network.Wai.Handler.Warp (run)
import Server (application)
import Network.HTTP.Client (Manager, newManager, defaultManagerSettings)
import Data.IORef
import Types.Schema


httpConnectionManager :: IO Manager
httpConnectionManager = newManager defaultManagerSettings

buildContext :: AppConfig -> IO AppContext
buildContext config = do
  let ctxConfig     = config
  ctxHttpManager   <- httpConnectionManager
  ctxSchema        <- emptySchema >>= newIORef
  return AppContext{..}

runHttpServer :: AppContext -> IO ()
runHttpServer ctx = let serverPort = port $ ctxConfig ctx in
  run serverPort (application ctx)


start :: IO ()
start = loadConfig "conf.yml" >>= buildContext >>= runHttpServer
