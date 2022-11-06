{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric  #-}

module Effect.SchemaStorageSpec where

import           Control.Concurrent.Async
import           Control.Concurrent.MVar
import           Data.Aeson
import           Effect.SchemaStorage
import           GHC.Generics
import           Test.Hspec
import Control.Monad.Except
import Control.Exception

main :: IO ()
main = hspec spec

data TestValue =
  TestValue
    { counter :: Int
    }
  deriving (Show, Eq, Generic, ToJSON, FromJSON)

runConcurrentCount :: FilePath -> MVar TestValue -> Int -> IO ()
runConcurrentCount filePath mvarCounter threads = do
  modifyAndStore filePath mvarCounter id -- Записываем начальное значение
  replicateConcurrently_ threads $ modifyAndStore filePath mvarCounter (\(TestValue x) -> TestValue (x + 1))

spec :: Spec
spec = do
  describe "Check value storage" $ do
    it "Should store value after change" $ do
      let tmpFile = "/tmp/test.json"
      mvarCounter <- newMVar (TestValue 0)
      runConcurrentCount tmpFile mvarCounter 1000
      (TestValue result) <- eitherDecodeFileStrict' tmpFile >>= either error return
      (TestValue finalCounter) <- readMVar mvarCounter
      result `shouldBe` 1000
      finalCounter `shouldBe` 1000
