const express = require("express");
const {getHealth, readinessController} = require("../controllers/healthController");
const router = express.Router();

router.get('/health', getHealth)
router.get('/ready', readinessController)

module.exports =  router;
