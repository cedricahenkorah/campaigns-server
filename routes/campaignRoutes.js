const express = require("express");
const {
  getCampaigns,
  getCampaign,
  createCampaign,
} = require("../controllers/campaignsController");

const router = express.Router();

// get all campaigns
router.get("/", getCampaigns);

// get a single campaign
router.get("/:id", getCampaign);

// create a campaign
router.post("/", createCampaign);

module.exports = router;
