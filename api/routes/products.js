const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Product.find().exec()
  .then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "post from products",
      product: product
    });
  })
  .catch(err => {console.log(err); res.status(500).json({err: err})});



});

router.patch('/:productID', (req, res, next) => {
  res.status(200).json({
    message: "updated product"
  });
});

router.delete('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.remove({_id: id}).exec()
  .then(res => {
    res.status(200).json(res);
  })
  .catch(err => {console.log(err); res.status(500).json(err)});
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    if(doc) res.status(200).json({doc: doc});
    else res.status(404).json({message: "Not found"});
  })
  .catch(err => {console.log(err); res.status(500).json({err: err})});
});

module.exports = router;
