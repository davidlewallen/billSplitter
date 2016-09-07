const express = require('express');
const router = express.Router();

const Bill = require('../models/bill');
const User = require('../models/user');
const utils = require('../utils/utils');

module.exports = router;

// *** GET all bills ***
router.get('/', function(req, res, next) {
  Bill.getBills()
  .then(bills => {
    if(!bills) {
      res.status(404).send('ERROR: No bills found');
    } else {
      res.status(200).json(bills);
    }
  })
  .catch(err => {
    next(err);
  });
});

// *** GET Bill by bill id ***
router.get('/:billId', function(req, res, next) {
  Bill.getBillById(req.params.billId)
  .then(bill => {
    if(!bill) {
      res.status(404).send('ERROR: No bill by that id found');
    } else {
      res.status(200).json(bill);
    }
  })
  .catch(err => {
    next(err);
  });
});

// *** GET all bills associated with a group id ***
router.get('/group/:groupId', function(req, res, next) {
  Bill.getBillsByGroup(req.params.groupId)
  .then(bills => {
    if(!bills) {
      res.status(404).send('ERROR: No bills found for group');
    } else {
      res.status(200).json(bills);
    }
  })
  .catch(err => {
    next(err);
  });
});

// *** POST create a new bill ***
router.post('/', function(req, res, next) {
  let billData = {
    company_name     : req.body.companyName,
    due_date         : req.body.dueDate,
    amount_total     : req.body.amountTotal,
    amount_remaining : req.body.amountTotal,
    user_id          : req.body.userId,
  }

  User.getUserById(req.body.userId)
  .then(user => {
    billData.group_id = user[0].group_id;
    return User.getUsersByGroup(user[0].group_id)
  })
  .then(users => {
    billData.amount_per_person = billData.amount_total / users.length;
    return Bill.createBill(billData);
  }) 
  .then(bill => {
    res.status(201).send(bill);
  })
  .catch(err => {
    next(err);
  });
});