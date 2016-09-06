const express = require('express');
const router  = express.Router();

const utils = require('../utils/utils');
const Group = require('../models/group');
const User  = require('../models/user');

module.exports = router;

// *** GET group by id ***
router.get('/:id', function(req, res, next) {
  utils.queryHandler(Group.getGroupById, req.params.id, req, res, next);
});

// *** POST create a group ***
router.post('/create', function(req, res, next) {
  Group.createGroup({ name: req.body.groupName, created_by: req.body.userId })
  .then(groupData => {
    return User.setUserGroup({groupId: groupData[0].id, userId: req.body.userId });
  })
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    next(err);
  });
});