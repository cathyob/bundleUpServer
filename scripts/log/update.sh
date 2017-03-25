#!/bin/bash

API="http://localhost:4741"
URL_PATH="/logs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "log": {
      "temp": "'"${TEMP}"'",
      "feelsLike": "'"${FEELS}"'",
      "weatherConditions": "'"${WCONS}"'",
      "bottomLayers": "'"${BOTTOM}"'",
      "topLayers": "'"${TOP}"'",
      "accessories": "'"${ACC}"'",
      "activityLevel": "'"${ACTIVITY}"'",
      "comfortLevel": "'"${COMFORT}"'"
    }
  }'

echo
