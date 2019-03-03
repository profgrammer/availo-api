const express = require('express');
const router = express.Router();
const wp = require('web-push');
const Sub = require('../models/subscription');
var cron = require('node-cron');

wp.setVapidDetails(
  'mailto: test@test.com',
'BDQ2A1k5b4RzV73Bf_uIWAA_4lWwOtIdXTXYFZErahePxfja13ALOmcWWXP-SQpNJ-flOwRZnWbyd87szPlAAFw',
'1BVV4jFDkJWeQjFsM2zNSsxz24hHT8E_tBV6ZVj5wXo');

router.post('/subscribe', (req, res, next) => {
  const sub = req.body;
  const subscription = new Sub(
    {
      endpoint: sub.endpoint,
      keys: sub.keys
    }
  );
  subscription.save()
  .then(result => {
    if(result){
      res.status(200).json({message: 'success'});
    }
  })
  .catch(e => res.status(500).json(e));
});

cron.schedule('*/2 * * * *', () => {
  Sub.find()
  .then(subs => {
    subs.forEach((sub) => {
      var pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh
        }
      }
      wp.sendNotification(pushConfig, JSON.stringify({message: 'hi'})).catch(e => console.err(e));
    });
  });
});

module.exports = router;
