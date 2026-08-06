require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const healthRoute = require("./routes/healthRoutes");
const userRoute = require('./routes/userRoutes')
const connectDB = require("./config/dbConnection");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", healthRoute);
app.use("/api/v1", userRoute);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer()
