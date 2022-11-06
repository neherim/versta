{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE FlexibleContexts #-}
module Server where

import App
import Types.Schema
import Data.Text
import Servant
import Control.Monad.Reader
import Control.Monad.Logger

type ServiceApi = "services" :> Get '[JSON] ProjectSchema
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
    nt app = runStdoutLoggingT $ runReaderT (runAppM app) ctx


-- HTTP API Handlers
apiGetSchema :: (HasSchema m) => m ProjectSchema
apiGetSchema = getSchema

apiGetServiceInfo :: (MonadIO m) => Text -> m ServiceSchema
apiGetServiceInfo _ = undefined
