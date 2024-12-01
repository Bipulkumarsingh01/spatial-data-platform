const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const pointRoutes = require('./routes/pointRoutes');
const polygonRoutes = require('./routes/polygonRoutes');
require('dotenv').config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/points', pointRoutes);
app.use('/api/polygons', polygonRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;