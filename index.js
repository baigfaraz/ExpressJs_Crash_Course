//Import
// Import express
const express = require('express');
// Import logger middleware
// const logger = require('./middleware/logger');

// Initialize the express
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Initialize the middleware
// app.use(logger);

app.use('/api/members' ,  require('./routes/api/members'));


// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server started at Port ${PORT}.`));