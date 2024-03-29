{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE DeriveGeneric      #-}
{-# LANGUAGE FlexibleInstances  #-}
{-# LANGUAGE OverloadedStrings  #-}
{-# LANGUAGE TemplateHaskell    #-}

module Data.AsyncApi.Internal where

import           Data.Aeson
import           Data.Aeson.TH               (deriveFromJSON)
import qualified Data.ByteString.Lazy        as LBS
import           Data.Data                   (Constr, Data (..), DataType,
                                              Fixity (..), Typeable,
                                              constrIndex, mkConstr, mkDataType)
import           Data.Swagger.Internal
import           Data.Swagger.Internal.Utils
import           Data.Text
import           GHC.Generics                (Generic)

data AsyncApi =
  AsyncApi
    -- | Provides metadata about the API.
    -- The metadata can be used by the clients if needed.
    { _asyncApiInfo     :: Info
    -- | Provides connection details of servers.
    , _asyncApiServers  :: Definitions Server
    , _asyncApiChannels :: Definitions Channel
    }
  deriving (Eq, Show, Generic, Data, Typeable)

data Server =
  Server
    -- | A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the AsyncAPI document is being served. Variable substitutions will be made when a variable is named in {brackets}.
    { _serverUrl             :: URL
    -- | The protocol this URL supports for connection. Supported protocol include, but are not limited to: amqp, amqps, http, https, jms, kafka, kafka-secure, mqtt, secure-mqtt, stomp, stomps, ws, wss.
    , _serverProtocol        :: Text
    -- | The version of the protocol used for connection. For instance: AMQP 0.9.1, HTTP 2.0, Kafka 1.0.0, etc.
    , _serverProtocolVersion :: Maybe Text
    -- | An optional string describing the host designated by the URL. CommonMark syntax MAY be used for rich text representation.
    , _serverDescription     :: Maybe Text
    }
  deriving (Eq, Show, Generic, Data, Typeable)

data Channel =
  Channel
    { _channelDescription :: Maybe Text
    , _channelSubscribe   :: Maybe AsyncOperation
    , _channelPublish     :: Maybe AsyncOperation
    }
  deriving (Eq, Show, Generic, Data, Typeable)

data AsyncOperation =
  AsyncOperation
    -- | Unique string used to identify the Asyncoperation. The id MUST be unique among all operations described in the API. The operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an Asyncoperation, therefore, it is RECOMMENDED to follow common programming naming conventions.
    { _asyncOperationOperationId :: Maybe Text
    , _asyncOperationSummary     :: Maybe Text
    , _asyncOperationDescription :: Maybe Text
    , _asyncOperationMessage     :: Maybe (Referenced Message)
    }
  deriving (Eq, Show, Generic, Data, Typeable)

data Message =
  Message
    { _messageName    :: Maybe Text
    , _messageTitle   :: Maybe Text
    , _messagePayload :: Maybe Value
    , _messageOneOf   :: Maybe [Referenced Message]
    }
  deriving (Eq, Show, Generic, Data, Typeable)

deriveFromJSON (jsonPrefix "AsyncApi") 'AsyncApi

deriveFromJSON (jsonPrefix "Server") 'Server

deriveFromJSON (jsonPrefix "Channel") 'Channel

deriveFromJSON (jsonPrefix "AsyncOperation") 'AsyncOperation

deriveFromJSON (jsonPrefix "Message") 'Message

instance FromJSON (Referenced Message) where
  parseJSON = referencedParseJSON "#/components/messages/"

readExample :: FilePath -> IO (Either String AsyncApi)
readExample path = eitherDecode <$> LBS.readFile path

ex = readExample "async-api.json"

ex2 = readExample "slack.json"
