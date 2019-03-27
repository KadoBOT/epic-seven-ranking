#!/bin/bash
dos2unix ./scripts/build.sh

DIRECTORY=./src/assets/epic7-db
CREATE_JSON_FILE=./scripts/createJson.js
JSON=$DIRECTORY/dict.json
STEPS=4

if [ -d "$DIRECTORY" ]
then
  echo "[1/$STEPS] Cleaning..."
  rm -rf "$DIRECTORY"
fi

echo "[2/$STEPS] Downloading repo..."
git clone -q https://github.com/EpicSevenDB/gamedatabase.git ./temp
echo "[3/$STEPS] Copying files..."
cp -R ./temp/src "$DIRECTORY"
rm -rf ./temp

echo "[4/$STEPS] Creating JSON..."
touch "$JSON"
node "$CREATE_JSON_FILE" > "$JSON"

echo "Done"
exit 0
