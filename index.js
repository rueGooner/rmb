const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const app = require('./app');

require('dotenv').config()

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});