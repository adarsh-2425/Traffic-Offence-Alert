const express = require('express');
const app = express();

const PORT = process.env.port || 3000;

//database
const connectDb = require('./config/db.js');
connectDb();

//express middleware for parsing json data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Use the violation routes
const violationRoutes = require('./routes/violationRoutes');
app.use('/api', violationRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});


//server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});