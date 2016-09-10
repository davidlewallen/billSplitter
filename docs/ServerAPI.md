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

##### GET /api/group/code/:groupCode
  * given a group_code, returns an array with a single group

##### POST /api/group/create
  * request body should have a userId, groupName
  * return a newly created group with the user auto joined

##### POST /api/group/join/:groupCode
  * request body should have a userId
  * given a userId and groupCode, user should join said group

## Bill

##### GET /api/bill
  * returns an array of all bills

##### GET /api/bill/:billId
  * given a bill_id, returns an array with a single bill

##### GET /api/bill/group/:groupId
  * given a group_id, returns an array with all bills associated with said group

##### POST /api/bill/pay/:billId
  * request body should have a userId
  * given a userId and billId, update

##### POST /api/bill
  * request body should have the following
    * companyName
    * dueDate
    * amountTotal
    * userId
    * groupId
  * given the following information, create a bill for the said group with provided information