const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Officer = require('../models/officer');

router.patch('/update', (req, res, next) => {
  const id = req.body._id;
  const status = req.body.status;
  Officer.findById(id).exec()
  .then(officer => {
    if(officer) {
      console.log('officer found');
      officer.status = status;
      officer.save().then(r => res.status(200).json({message: 'updated'})).catch(err => res.status(500).json(err));
    }
    else{
      console.log('officer not found');
      res.status(200).json({message: 'officer not found'});
    }
  }).catch(e => res.status(500).json(e));

});

module.exports = router;
