const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Coord = require('../models/coord');

router.post('/', (req, res, next) => {
  const id = req.body._id;
  const location = req.body.location;
  const coord = new Coord({
    _id: new mongoose.Types.ObjectId(),
    officerId: id,
    location: location,
    timestamp: new Date()
  });
  coord.save()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Successfully added",
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/', (req, res, next) => {
  Coord.find().exec()
  .then(coords => {
    if(coords){
      console.log(coords);
      res.status(200).json(coords);
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
})

router.patch('/', (req, res, next) => {
  const id = req.body._id;
  const location = req.body.location;

  Coord.find({officerId: id}).exec()
  .then(coord => {
    if(coord){
      console.log('coord found');
      coord.location = location;
      coord.timestamp = new Date();
      coord.save().then(r => {console.log('updated'); res.status(200).json({'message': 'updated'})}).catch(e => res.status(500).json(e));
    }
    else{
      res.status(404).json({message: 'not found'});
    }
  })
});

module.exports = router;
