const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Coord = require('../models/coord');

router.post('/', (req, res, next) => {
  const id = req.body._id;
  console.log(id);
  const location = req.body.location;
  console.log(location);
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
  .then(coord => {
    if(coord){
      console.log(coord);
      res.status(200).json(coord);
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
  console.log(id);
  // const location = ;
  console.log(req.body.location);
  Coord.findOne({officerId: id}).exec()
  .then(coord => {
    if(coord){
      console.log('coord found');
      coord.location = req.body.location;
      coord.timestamp = new Date();
      coord.save().then(r => {console.log('updated'); res.status(200).json({'message': 'updated'})}).catch(e => res.status(500).json(e));
    }
    else{
      res.status(404).json({message: 'not found'});
    }
  })
});

router.get('/:officerId', (req, res, next) => {
  const officerId = req.params.officerId;
  Coord.find({officerId: officerId}).sort([['timestamp', -1]]).exec()
  .then(coord => {
    if(coord){
      res.status(200).json(coord[0]);
    }
    else{
      res.status(500).json({message: 'internal error'})
    }
  })
  .catch(e => res.status(200).json(e));
})

router.delete('/', (req, res, next) => {
  Coord.deleteMany({}).then(result => {
    if(result){
      console.log('deleted');
      res.status(200).json({message: 'deleted'})
    }
  });
});

module.exports = router;
