const express = require('express');
const Officer = require('../models/officer');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

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

router.get('/:officerId', (req, res) => {
  Officer.findById(req.params.officerId).exec()
  .then(officer => {
    if(officer){
      res.status(200).json(officer);
    }
    else{
      res.status(404).json({message: "Not found"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.post('/add', (req, res) => {
  Officer.find({email: req.body.email}).exec()
  .then(result => {
    if(result.length >= 1){
      return res.status(409).json({
        message: 'user already exists.'
      });
    }
    else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          return res.status(500).json({
            error: err
          });
        }
        else{
          const officer = new Officer({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email:req.body.email,
            designation: req.body.designation,
            department: req.body.department,
            description: req.body.description,
            phoneNo : req.body.phoneNo,
            address: req.body.address,
            password:hash,
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
        }
    })
    }
  })
});

router.post('/login', (req, res, next) => {
  Officer.find({email: req.body.email}).exec()
  .then(officer => {
    if(officer.length < 1){
      return res.status(401).json({
        message: 'auth failed'
      });
    }
    else{
      bcrypt.compare(req.body.password, officer[0].password, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }
      if(result){
        const token = jwt.sign({
          email: req.body.email,
          userId: officer[0]._id
        }, process.env.JWT_KEY, {
          expiresIn: "1h"
        }, );
        res.status(200).json({
          message: 'auth successful!',
          token: token
        })
      }
    })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'login failed',
      error: err
    })
  });
})

router.patch('/', verifyToken, (req, res, next) => {
  // res.json(req.userToken)
  Officer.findById(req.userToken.userId).exec()
  .then(result => {
    if(result){
      result.status = req.body.status;
      result.timestamp = new Date();
      result.save().then(r => res.status(200).json({message: 'updated'})).catch(err => res.status(500).json(err))
    }
    else{
      res.status(404).json({message: 'not found'})
    }
  });

})

module.exports = router;
