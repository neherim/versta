{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE OverloadedStrings #-}

module Server where

import App
import Types.Schema
import Data.Text
import Servant
import Control.Monad.IO.Class (liftIO)
import Control.Monad.Reader

type ServiceApi = "services" :> Get '[JSON] Schema
             :<|> "services" :> Capture "serviceName" Text :> Get '[JSON] ServiceSchema

type ApiV1 = "api" :> "v1" :>  ServiceApi


server :: ServerT ApiV1 AppM
server = apiGetSchema
    :<|> apiGetServiceInfo


serviceApi :: Proxy ApiV1
serviceApi = Proxy


application :: AppContext -> Application
application ctx = serve serviceApi $ hoistServer serviceApi nt server
  where
    nt app = runReaderT (runAppM app) ctx


-- HTTP API Handlers
apiGetSchema :: AppM Schema
apiGetSchema = liftIO emptySchema

apiGetServiceInfo :: Text -> AppM ServiceSchema
apiGetServiceInfo _ = return $ ServiceSchema "scrooge-person" (Just "Some descriprion")
