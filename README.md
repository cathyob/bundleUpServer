# bundleUP API

FRONT END REPO: https://github.com/cathyob/bundleUP

DEPLOYED FRONT END: https://cathyob.github.io/bundleUP/

BACK END REPO: https://github.com/cathyob/bundleUpServer

DEPLOYED BACK END:  https://bundleupcathyob.herokuapp.com/

## Endpoints
User:
  * Create - sign up -  POST - /sign-up
  * Read - sign in - POST - /sign-in/:id
  * Update - change password - PUT - /user/:id
  * Update - save last valid location search - PUT -/user/:id
  * Update - sign out - DELETE - /sign-out/:id

Log:
  * Create - new entry - POST - /log
  * Read - see past entries - GET - /log/:id
  * Read - see average of entries (used to generate custom message) - GET - /log
  * Update - edit past entry - PUT - /log/:id
  * Delete - remove past entry - DELETE - /log/:id

## ERD
![alt text](https://raw.githubusercontent.com/cathyob/bundleUpServer/master/ERD.png "ERD")

## Dependencies/Technologies
Uses MongoDB, Mongoose, Express along with a Heroku deployed backend server

My inital designs could have been applied to an SQL or NoSQL structure and my future plans for the app did not impact either version so I decided to use a Mongo/Express API to practice NoSQL.

A User document contains subdocuments of Logs. Each Log contains:
- dateTime: { type: Date, default: Date.now, },
- temp: { type: Number, },
- feelsLike: { type: Number, required:true, },
- weatherConditions: { type: String, required: true, },
- bottomLayers: { type: String, default: '', },
- topLayers: { type: String, required: true, default: '', },
- accessories: { type: String, default: '', },
- activityLevel: { type: Number, required: true, },
- comfortLevel: { type: Number, required: true, }

## Approach
I decided to have the dateTime default to the time the report is created. Also, the feelsLike detail is required since that will be what I will base returning the most recent, similar days to a customized message shown to a signed in user.

For the layers fields, I made them each default to an empty string so that if the user leaves them blank it won't return null. This reduces the cases needed to be accounted for in the front end.

## Testing and Hurdles
As part of the set-up of this file, I found and addressed two shortcomings within the users controller:
1) On sign-up it did not check to see if the second password entry matched the first. I added a ternary to ensure they matched.
2) On change password it did not recognize an empty new password as an error. I added a ternary to ensure it was not an empty string.

Before deployment I made sure to create curl scripts in order to test my log endpoints. I was able to create working curl scripts for all routes.

# Thank you!
Thank you very much for checking out my app!
Please be sure to try it out and let me know if you have any questions!
https://cathyob.github.io/bundleUP/
