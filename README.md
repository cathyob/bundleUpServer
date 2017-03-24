# bundleUP API

## Endpoints

User:

Create - sign up - POST - /sign-up
Read - sign in - POST - /sign-in/:id
Update - change password - PUT - /user/:id
Update - save last valid location search - PUT -/user/:id
Update - sign out - DELETE - /sign-out/:id
Log:

Create - new entry - POST - /user
Read - see past entries - GET - /user/:id/entry
Read - see average of entries (used to generate custom message) - GET - /user/:id
Update - edit past entry - PUT - /user/:id/entry/:entry_id
Delete - remove past entry - DELETE - /user/:id/entry/:entry_id

## ERD
![alt text](https://raw.githubusercontent.com/cathyob/bundleUpServer/master/ERD.png "ERD")
