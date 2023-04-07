const path = require('path');
const colors = require('colors');
const express = require('express');
const { config } = require('dotenv');
const connectDB = require('./config/db');
config();
const PORT = process.env.PORT || 3001;

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use routers
app.use('/api/tracker', require('./routes/trackerRoutes'));

app.use('/api/fitLog', require('./routes/logRoutes'));
// listen to port
app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});
// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app

// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });
