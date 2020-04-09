const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db("accounts")
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving accounts" });
    });
});

module.exports = router;
