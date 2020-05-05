const knex = require('knex');

// this is importing and assigning from knexfile.js
const configOptions = require('../knexfile').development;

// configOptions declared on top
module.exports = knex(configOptions);