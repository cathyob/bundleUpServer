#!/bin/bash

API="http://localhost:4741"
URL_PATH="/logs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "log": {
      "location": "'"${LOC}"'",
      "temp": "'"${TEMP}"'",
      "feels_like": "'"${FEELS}"'",
      "weather_conditions": "'"${WCONS}"'",
      "bottom_layers": "'"${BOTTOM}"'",
      "top_layers": "'"${TOP}"'",
      "accessories": "'"${ACC}"'",
      "activity_level": "'"${ACTIVITY}"'",
      "comfort_level": "'"${COMFORT}"'"
    }
  }'

echo
