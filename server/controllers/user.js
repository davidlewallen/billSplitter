const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const User = require('../models/user');

module.exports = router;


// *** GET user by google id *** //
router.get('/google/:googleId', function(req, res, next) {
  utils.queryHandler(User.getUserByGoogleId, req.params.id, req, res, next);
})

// *** GET user by id *** //
router.get('/:id', function(req, res, next) {
  utils.queryHandler(User.getUserById, req.params.id, req, res, next);
})

// *** GET user by email *** //
router.get('/email/:userEmail', function(req, res, next) {
  utils.queryHandler(User.getUserByEmail, req.params.userEmail, req, res, next);
})

// *** GET users by group *** //
router.get('/group/:groupId', function(req, res, next) {
  utils.queryHandler(Users.getUsersByGroup, req.params.groupId, req, res, next);
})

// *** GET user data *** //
router.get('/user/:userId', function(req, res, next) {
  utils.queryHandler(Users.getUser, req.params.userId, req, res, next);
})

// *** POST set user's group *** //
router.post('/setUserGroup/:groupId', function(req, res, next) {
  utils.queryHandler(Users.setUserGroup, req.params.groupId, req, res, next);
})
