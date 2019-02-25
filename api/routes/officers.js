const express = require('express');
const Officer = require('../models/officer');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', (req, res) => {
  Officer.find().exec()
  .then(docs => {
    if(docs){
      console.log(docs);
      res.status(200).json(docs);
    }
    else{
      console.log("error");
      res.status(404).json({message: "Not found"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/add', (req, res) => {
  const officer = new Officer({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email:req.body.email,
    designation: req.body.designation,
    department: req.body.department,
    description: req.body.description,
    phoneNo : req.body.phoneNo,
    address: req.body.address,
    password:req.body.password,
    officeLocation: req.body.officeLocation,
    status: req.body.status,
    timestamp: new Date(),
    workingHours: req.body.workingHours,
    phoneExtension: req.body.phoneExtension
  });

  officer.save()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Successfully added",
      officer: officer
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
