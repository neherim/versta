{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
module Server where

import App
import Types.Schema
import Data.Text
import Servant
import Control.Monad.Reader
import Control.Monad.Logger
import           Data.Aeson.QQ.Simple
import           Data.Aeson (Value)

type ServiceApi = "services" :> Get '[JSON] ProjectSchema
             :<|> "services" :> Capture "serviceName" Text :> Get '[JSON] Service
             :<|> "demo" :> Get '[JSON] Value

type ApiV1 = "api" :> "v1" :>  ServiceApi


server :: ServerT ApiV1 AppM
server = apiGetSchema
    :<|> apiGetServiceInfo
    :<|> apiGetDemoServiceInfo

serviceApi :: Proxy ApiV1
serviceApi = Proxy


application :: AppContext -> Application
application ctx = serve serviceApi $ hoistServer serviceApi nt server
  where
    nt app = runStdoutLoggingT $ runReaderT (runAppM app) ctx


-- HTTP API Handlers
apiGetSchema :: (HasSchema m) => m ProjectSchema
apiGetSchema = getSchema

apiGetServiceInfo :: (MonadIO m) => Text -> m Service
apiGetServiceInfo _ = undefined

apiGetDemoServiceInfo :: (Monad m) => m Value
apiGetDemoServiceInfo = return $ [aesonQQ|
{
  "id": "3bf69407-9e9e-443c-8e98-0b7b4fa625ff",
  "offsetX": 0,
  "offsetY": 0,
  "zoom": 100,
  "gridSize": 0,
  "layers": [
    {
      "id": "2a587407-c5e0-4ccb-9d82-f46ca87b40c5",
      "type": "diagram-links",
      "isSvg": true,
      "transformed": true,
      "models": {
        "3c5031cd-ee5d-4eae-98d1-ea6703613c70": {
          "id": "3c5031cd-ee5d-4eae-98d1-ea6703613c70",
          "locked": true,
          "type": "default",
          "source": "31c1ab95-8365-45eb-af66-6a5d1ec8b9db",
          "sourcePort": "7a71f28c-b6f8-4652-8b24-9a732e03945a",
          "target": "1481e9bb-1ab5-4801-811d-d83253029c99",
          "targetPort": "ff544648-06f0-487d-8026-20950eead162",
          "points": [
            {
              "id": "62b6e62f-5bd0-4d90-a927-552f4c5fc0d0",
              "type": "point"
            },
            {
              "id": "a228c8f7-01f5-4ede-9713-f7b61fbeca98",
              "type": "point"
            }
          ],
          "labels": [],
          "width": 3,
          "color": "gray",
          "curvyness": 50,
          "selectedColor": "rgb(0,192,255)"
        }
      }
    },
    {
      "id": "9c0ddb9f-a1c5-4949-bfef-a2aed216db5f",
      "type": "diagram-nodes",
      "isSvg": false,
      "transformed": true,
      "models": {
        "31c1ab95-8365-45eb-af66-6a5d1ec8b9db": {
          "id": "31c1ab95-8365-45eb-af66-6a5d1ec8b9db",
          "type": "default",
          "x": 136,
          "y": 31,
          "ports": [
            {
              "id": "9d15dd39-2fb0-4759-9b10-c0c51ec9be42",
              "type": "default",
              "name": "SendOutputResponseCommand",
              "alignment": "left",
              "parentNode": "31c1ab95-8365-45eb-af66-6a5d1ec8b9db",
              "links": [
                "1a6c4bee-3b4c-4013-82da-211ef186070d"
              ],
              "in": true,
              "label": "SendOutputResponseCommand"
            },
            {
              "id": "7a71f28c-b6f8-4652-8b24-9a732e03945a",
              "type": "default",
              "name": "ProcessInputRequestCommand",
              "alignment": "right",
              "parentNode": "31c1ab95-8365-45eb-af66-6a5d1ec8b9db",
              "links": [
                "3c5031cd-ee5d-4eae-98d1-ea6703613c70",
                "a7db5c1c-e727-4788-91ad-280577e53c5f",
                "3c8b553a-b666-441e-8505-6e160f4ff83c"
              ],
              "in": false,
              "label": "process-szvm-request"
            }
          ],
          "name": "scrooge-message-registry",
          "color": "rgb(192,255,0)",
          "portsInOrder": [
            "9d15dd39-2fb0-4759-9b10-c0c51ec9be42"
          ],
          "portsOutOrder": [
            "7a71f28c-b6f8-4652-8b24-9a732e03945a"
          ]
        },
        "1481e9bb-1ab5-4801-811d-d83253029c99": {
          "id": "1481e9bb-1ab5-4801-811d-d83253029c99",
          "type": "default",
          "x": 730,
          "y": 264,
          "ports": [
            {
              "id": "ff544648-06f0-487d-8026-20950eead162",
              "type": "default",
              "name": "ProcessInputRequestCommand",
              "alignment": "left",
              "parentNode": "1481e9bb-1ab5-4801-811d-d83253029c99",
              "links": [
                "3c5031cd-ee5d-4eae-98d1-ea6703613c70"
              ],
              "in": true,
              "label": "ProcessInputRequestCommand"
            },
            {
              "id": "0ccf7a20-d789-4c06-a2c2-386d91c4a012",
              "type": "default",
              "name": "SendOutputResponseCommand",
              "alignment": "right",
              "parentNode": "1481e9bb-1ab5-4801-811d-d83253029c99",
              "links": [
                "1a6c4bee-3b4c-4013-82da-211ef186070d"
              ],
              "in": false,
              "label": "SendOutputResponseCommand"
            },
            {
              "id": "ebd76639-528e-4307-88aa-43f085f3b152",
              "type": "default",
              "name": "PersonalDataUpdated",
              "alignment": "right",
              "parentNode": "1481e9bb-1ab5-4801-811d-d83253029c99",
              "links": [],
              "in": false,
              "label": "PersonalDataUpdated"
            },
            {
              "id": "16d3d2b4-51e5-4358-a393-56e14fd3ef31",
              "type": "default",
              "name": "OrganizationChanged",
              "alignment": "right",
              "parentNode": "1481e9bb-1ab5-4801-811d-d83253029c99",
              "links": [],
              "in": false,
              "label": "OrganizationChanged"
            }
          ],
          "name": "scrooge-person",
          "color": "rgb(192,255,0)",
          "portsInOrder": [
            "ff544648-06f0-487d-8026-20950eead162"
          ],
          "portsOutOrder": [
            "0ccf7a20-d789-4c06-a2c2-386d91c4a012",
            "ebd76639-528e-4307-88aa-43f085f3b152",
            "16d3d2b4-51e5-4358-a393-56e14fd3ef31"
          ]
        }
      }
    }
  ]
}
|]
