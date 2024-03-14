require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./src/routes/index.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use(route);

// Error handlers
app.use((err, req, res, next) => {
  res.status(400).json({
    status: 102,
    message: err,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
