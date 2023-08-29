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

// webhook controller routes
const webhookRoutes = require('./routes/webhookRoutes');
app.use('/api', webhookRoutes);

// Receipt Download Route
const receiptDownloadRoutes = require('./routes/receiptDownloadRoutes');
app.use('/api', receiptDownloadRoutes);

// Serve static files from the public folder
app.use(express.static('public'));

// Violation Form HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});


//server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});