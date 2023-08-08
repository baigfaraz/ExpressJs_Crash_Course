
// Import moment that is date formate
const moment = require('moment');

// create a logger
const logger = (req , res , next) =>{
    console.log(`You hit ${req.protocol}://${req.get('host')}${req.originalUrl} at ${moment().format()}`);
    next();
};

module.exports = logger;