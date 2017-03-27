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
      "location": "'"${LOC}"'",
      "temp": "'"${TEMP}"'",
      "feels_like": "'"${FEELS}"'",
      "weather-conditions": "'"${WCONS}"'",
      "bottom_layers": "'"${BOTTOM}"'",
      "top-layers": "'"${TOP}"'",
      "accessories": "'"${ACC}"'",
      "activity_level": "'"${ACTIVITY}"'",
      "comfort_level": "'"${COMFORT}"'"
    }
  }'

echo
