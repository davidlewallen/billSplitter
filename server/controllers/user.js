const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const User = require('../models/user');
const BillPay = require('../models/billPayInfo');

module.exports = router;

// *** GET user by google id *** //
router.get('/google/:googleId', function(req, res, next) {
  utils.queryHandler(User.getUserByGoogleId, req.params.googleId, req, res, next);
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
  utils.queryHandler(User.getUsersByGroup, req.params.groupId, req, res, next);
})

// *** PUT set user's group *** //
router.put('/setGroup/:groupId', function(req, res, next) {
  const data = { userId: req.body.userId, groupId: req.params.groupId };
  utils.queryHandler(User.setUserGroup, data, req, res, next);

  User.setUserGroup(data)
  .then(user => {

  })
})
