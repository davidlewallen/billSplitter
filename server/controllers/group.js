const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const Group = require('../models/group');

module.exports = router;

// *** GET group by id ***
router.get('/:id', function(req, res, next) {
  utils.queryHandler(Group.getGroupById, req.params.id, req, res, next);
})

// *** POST create a group ***
router.post('/create', function(req, res, next) {
  utils.queryHandler(Group.createGroup, req.body, req, res, next);
})