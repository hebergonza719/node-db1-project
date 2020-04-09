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

// router.post('/', async (req, res) => {
//   const newData = req.body;
  
//   try {
//     const account = await db.insert(newData).into('accounts');
//     res.status(201).json(account);
//   } catch (err) {
//     res.status(500).json({ message: 'db problem', error: err });
//   }
// });

router.post('/', (req, res) => {
  const newData = req.body;

  console.log("this is newdata ", newData)

  if(newData.name && newData.budget) {
    db.insert(newData).into('accounts')
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({ message: 'error creating new account'}, err);
    });
  } else {
    res.status(400).json({ errorMessage: "Please provide name and budget for the the account." })
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  // the curly are necessary in where({id}) because we need an object
  // {id: id}
  db('accounts').where({id}).update(changes)
    .then(count => {
      if(count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating account" });
    })
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db('accounts')
    .where({id: id})
    .del()
    .then(count => {
      res.status(200).json({ deleted: count} );
    })
    .catch(err => {
      res.status(500).json({ message: "error reaching database"});
    });
});

module.exports = router;