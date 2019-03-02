const express = require('express');
const router = express.Router();
const wp = require('web-push');



wp.setVapidDetails(
  'mailto: test@test.com',
'BDQ2A1k5b4RzV73Bf_uIWAA_4lWwOtIdXTXYFZErahePxfja13ALOmcWWXP-SQpNJ-flOwRZnWbyd87szPlAAFw',
'1BVV4jFDkJWeQjFsM2zNSsxz24hHT8E_tBV6ZVj5wXo');

router.post('/subscribe', (req, res, next) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({title: 'push test'});

  wp.sendNotification(subscription, payload).catch(e => console.err(e));
});


module.exports = router;
