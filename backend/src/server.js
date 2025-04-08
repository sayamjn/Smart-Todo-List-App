const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');
const dotenv = require('dotenv');

dotenv.config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not defined in environment variables.');
}

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'App is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
