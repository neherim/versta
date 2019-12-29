{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE OverloadedStrings #-}
module Data.AsyncApiSpec where

import Test.Hspec
import           Data.Aeson.QQ.Simple
import           Data.Aeson            (Result (..), fromJSON, Value)
import Data.AsyncApi
import Control.Lens

main :: IO ()
main = hspec spec

-- a^.channels.at "order.create" ^?! _Just . publish . _Just . message . _Just . _Inline . name

decodeSpec :: Value -> AsyncApi
decodeSpec v = case fromJSON v of
  Success r -> r
  Error e -> error e

spec :: Spec
spec = do
  describe "Decode AsyncApi spec" $ do
    it "Decode spec with inlined message schema" $ do
      let asyncApi = decodeSpec withInlinedMessageSchema
      asyncApi^.info.title `shouldBe` "Order service"
      asyncApi^.servers.at "Kafka broker node 2" ^?! _Just . url `shouldBe` URL "node02.kafka.dev.test.local:9092"

    it "Another test" $ do
      123 `shouldBe` 123


withInlinedMessageSchema :: Value
withInlinedMessageSchema = [aesonQQ|
{
  "asyncapi" : "2.0.0",
  "info" : {
    "title" : "Order service",
    "description" : "Service for order processing",
    "version" : "1.0.0"
  },
  "servers" : {
    "Kafka broker node 2" : {
      "url" : "node02.kafka.dev.test.local:9092",
      "protocol" : "kafka"
    },
    "Kafka broker node 1" : {
      "url" : "node01.kafka.dev.test.local:9092",
      "protocol" : "kafka"
    }
  },
  "channels" : {
    "order.create" : {
      "description" : "Topic for order creation",
      "publish" : {
        "traits" : [ ],
        "tags" : [ ],
        "message" : {
          "name" : "AvroCreateOutputMessageCommand",
          "title" : "neherim.asyncapi.example.messages.AvroCreateOutputMessageCommand",
          "payload" : {
            "type" : "object",
            "required" : [
              "receiverId",
              "attachments"
            ],
            "properties" : {
              "receiverId" : {
                "type" : "integer",
                "format" : "int64",
                "description" : "ID получателя"
              },
              "attachments" : {
                "type" : "array",
                "description" : "Список припреплённых файлов",
                "items" : {
                  "type" : "object",
                  "properties" : {
                    "path" : {
                      "type" : "string",
                      "description" : "Путь к файлу"
                    },
                    "type" : {
                      "type" : "string",
                      "description" : "Код файла"
                    }
                  }
                }
              },
              "statusDetails" : {
                "type" : "string",
                "description" : "Детализация изменения статуса"
              },
              "commandData" : {
                "type" : "object",
                "description" : "Обшие данные команды",
                "properties" : {
                  "id" : {
                    "type" : "string",
                    "description" : "Идентификатор команды"
                  },
                  "timestampMs" : {
                    "type" : "integer",
                    "format" : "int64",
                    "description" : "Таймштамп создания команды"
                  }
                }
              },
              "inputMessageId" : {
                "type" : "string",
                "description" : "Идентификатор сообщения"
              },
              "statusCode" : {
                "type" : "integer",
                "format" : "int32",
                "description" : "Код нового статуса"
              }
            }
          }
        }
      },
      "deprecated" : false
    },
    "order.event" : {
      "description" : "Order events",
      "subscribe" : {
        "traits" : [ ],
        "tags" : [ ],
        "message" : {
          "name" : "OutputMessagesCreated",
          "payload" : {
            "id" : "urn:jsonschema:com:github:neherim:asyncapi:example:messages:OutputMessagesCreated",
            "properties" : {
              "orderId" : {
                "type" : "string"
              },
              "status" : {
                "type" : "string"
              }
            }
          }
        }
      },
      "deprecated" : false
    }
  },
  "tags" : [ ],
  "externalDocs" : {
    "url" : "https://www.asyncapi.com/docs",
    "description" : "Additional docs"
  }
}
|]
