require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect(process.env.MONGODB_STRING)

  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch(err => console.error("DB connection error", err));
