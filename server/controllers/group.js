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

// *** GET group by group_code ***
router.get('/code/:groupCode', function(req, res, next) {
  utils.queryHandler(Group.getGroupByCode, req.params.groupCode, req, res, next);
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

// *** POST join user to a group ***
router.post('/join/:groupCode', function(req, res, next) {
  Group.getGroupByCode(req.params.groupCode)
  .then(group => {
    if(!group) {
      res.status(404).send('ERROR: Group not found')
    } else {
      const groupData = { userId: req.body.userId, groupId: group[0].id}

      return User.setUserGroup(groupData);
    }
  })
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    next(err)
  });
});