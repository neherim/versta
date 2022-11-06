{-# LANGUAGE FlexibleContexts #-}

module Effect.SchemaStorage where

import           App.Error
import           Control.Concurrent.MVar
import           Control.Exception
import           Control.Monad.Except
import           Control.Monad.Logger
import           Control.Monad.Trans
import           Data.Aeson
import           Data.Text               (Text)
import           System.Directory        (doesFileExist)
import           Types.Schema

modifyAndStore :: (ToJSON a) => FilePath -> MVar a -> (a -> a) -> IO ()
modifyAndStore filePath mvar modify =
  modifyMVarMasked_ mvar $ \val -> do
    let newValue = modify val
    encodeFile filePath newValue
    return newValue

readProjectSchemaFromFile :: FilePath -> IO ProjectSchema
readProjectSchemaFromFile filePath = do
  exist <- doesFileExist filePath
  if exist
    then do
      putStrLn $ "Loaded schema from file " ++ filePath
      readSchemaFromJson
    else do
      putStrLn $ "File with project schema " ++ show filePath ++ " doesn't exist. Load empty schema"
      return emptySchema
  where
    readSchemaFromJson :: IO ProjectSchema
    readSchemaFromJson = eitherDecodeFileStrict' filePath >>= either error return
