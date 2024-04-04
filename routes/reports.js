const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/report");
const userAuthentication = require("../middleware/auth");

router.post(
    "/dailyReports",
    userAuthentication.authenticate,
    reportsController.dailyReports
  );
router.post(
    "/monthlyReports",
    userAuthentication.authenticate,
    reportsController.monthlyReports
  );
router.get("/download", userAuthentication.authenticate,reportsController.downloadReports);

  
  module.exports = router;