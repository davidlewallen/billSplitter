## User

##### GET /api/user/google/:googleId
  * given a google id, returns an array with a single user

##### GET /api/user/:id
  * given a user id, returns an array with a single user

##### GET /api/user/email/:userEmail
  * given an email, returns an array with a single user

##### GET /api/user/group/:groupId
  * given a group id, returns an array with all users of that group

##### PUT /api/user/setGroup/:groupId
  * request body should have a userId
  * given a group id, update user with groupId

## Group

##### GET /api/group/:id
  * given a group id, returns an array with a single group

##### POST /api/group/create
  * request body should have a userId, groupName
  * return a newly created group with the user auto joined