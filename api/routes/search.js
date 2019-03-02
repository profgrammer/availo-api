const express = require('express');
const router = express.Router();
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });

router.post('/', async (req, res, next) => {
  manager.load(__dirname + "/model.nlp");
  const response = await manager.process('en', req.body.query);
  res.status(200).json(response);
});

module.exports = router;
