const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

console.log(process.env.MONGODB_URL);


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on http://localhost:5000')))
  .catch(err => console.error(err));
