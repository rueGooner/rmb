const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const shopRouter = require('./server/routes/api/shopRoutes');
const barberRouter = require('./server/routes/api/barberRoutes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("OK");
});

app.use('/api/shops', shopRouter);
app.use('/api/barbers', barberRouter);

module.exports = app;