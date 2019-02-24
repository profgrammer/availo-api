const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "GET request to orders"
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productID: req.body.productID,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: "POST request to orders",
    order: order
  });
});

router.get('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: "GET request to orderid",
    id: req.params.orderID

  });
});

router.delete('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: "DELETE request to orderid",
    id: req.params.orderID

  });
});

module.exports = router;
