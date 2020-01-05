{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE QuasiQuotes #-}
module Lib
  ( start
  )
where

import           App
import           Prelude                           hiding ( id )
import           Network.Wai.Handler.Warp                 ( run )
import           Server                                   ( application )
import           Network.HTTP.Client                      ( Manager
                                                          , newManager
                                                          , defaultManagerSettings
                                                          )
import           Data.IORef
import           Data.UUID
import           Data.UUID.V4
import           Data.Text
import           Data.Yaml
import           Data.Maybe
import           Types.Schema
import           Types.Config
import           Types.Lens
import           Control.Lens
import           Control.Monad.Trans

httpConnectionManager :: IO Manager
httpConnectionManager = newManager defaultManagerSettings

buildContext :: AppConfig -> IO AppContext
buildContext config = do
  let ctxConfig = config
  ctxHttpManager <- httpConnectionManager
  ctxSchema      <- stubProjectSchema >>= newIORef
  return AppContext { .. }

runHttpServer :: AppContext -> IO ()
runHttpServer ctx =
  let serverPort = configPort $ ctxConfig ctx
  in  run serverPort (application ctx)


start :: IO ()
start = decodeFileThrow "conf.yml" >>= buildContext >>= runHttpServer


stubProjectSchema :: (MonadIO m) => m ProjectSchema
stubProjectSchema =
  let
    service1 = Service
      { _serviceId          = uuid "8942cc31-db8e-4266-9ac8-32a6438fffe7"
      , _serviceName        = "order-service"
      , _serviceDescription = Just "Service for order registration"
      , _serviceInPorts     = [ Port
                                { _portId   = uuid
                                                "ea169016-b08c-41c6-9c4e-a87c3522c287"
                                , _portName = "CreateOrder"
                                }
                              , Port
                                { _portId   = uuid
                                                "8a87d0e7-3b95-4eaf-9774-fd28fc593bfe"
                                , _portName = "RefundOrder"
                                }
                              ]
      , _serviceOutPorts    =
        [ Port { _portId   = uuid "4596e3ef-59d1-4667-8c78-28bc46dab4a2"
               , _portName = "OrderCreated"
               }
        , Port { _portId   = uuid "e52e3863-2f47-44e2-bcaf-4635a0b02ac4"
               , _portName = "OrderRefunded"
               }
        ]
      }
    service2 = Service
      { _serviceId          = uuid "d81080b9-53ff-4472-985d-363c306de8b8"
      , _serviceName        = "notification-service"
      , _serviceDescription = Just "Service for customer notification"
      , _serviceInPorts     =
        [ Port { _portId   = uuid "0fa043ce-5ece-4d00-83a0-10cb412ff29e"
               , _portName = "OrderCreated"
               }
        ]
      , _serviceOutPorts    =
        [ Port { _portId   = uuid "a762c054-c174-4880-92a3-9b5e08cec5a9"
               , _portName = "NotificationCreated"
               }
        ]
      }
    link1 = Link { _linkId   = uuid "4040b8e6-6fd4-4f91-97cd-67e9109e3cb2"
                 , _linkFrom = service1 ^. outPorts ^?! element 0 . id
                 , _linkTo   = service2 ^. inPorts ^?! element 0 . id
                 }
  in
    return ProjectSchema
      { _projectSchemaId       = uuid "58b1d03d-748b-4db6-983f-b7bdbb2873af"
      , _projectSchemaServices = [service1, service2]
      , _projectSchemaLinks    = [link1]
      }
 where
  uuid :: Text -> UUID
  uuid = fromJust . fromText
  randomUUID :: IO UUID
  randomUUID = nextRandom
