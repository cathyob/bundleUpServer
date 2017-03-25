# bundleUP API

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
