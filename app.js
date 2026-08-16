require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const healthRoute = require("./routes/healthRoutes");
const authRoutes = require("./routes/authenticationRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", healthRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", userProfileRoutes);
app.use("/api/v1/product", productRoutes);

app.use(notFound);

app.use(errorHandler);

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

startServer();
