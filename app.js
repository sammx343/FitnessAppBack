const express = require("express");
const routes = require("./routes/routerIndex");
const connectToDatabase = require("./database");

const app = express();
const port = 3000;

// CORS headers middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware to connect to the database
app.use(connectToDatabase);

// Middleware to parse JSON in the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
