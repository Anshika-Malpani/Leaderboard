const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const port = process.env.PORT || 4000


require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://leaderboard-frontend-3l5a.onrender.com',
  credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Success')
});
app.use('/api', userRoutes);



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error(err));
