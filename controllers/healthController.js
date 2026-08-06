const  mongoose  = require("mongoose");

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_DEV || "development",
  });
};

const readinessController = (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  if (!isDatabaseConnected) {
    return res.status(503).json({
      success: false,
      status: "DOWN",
      message: "Database is not connected",
      timestamp: new Date().toISOString(),
    });
  }

  res.status(200).json({
    success:true,
    status:"READY",
    message:"Application is ready",
    timestamp:new Date().toISOString()
  })
};

module.exports = { getHealth, readinessController };
