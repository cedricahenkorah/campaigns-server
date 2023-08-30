const Campaign = require("../models/Campaign");
const mongoose = require("mongoose");

// @desc get all campaigns
// @route GET /campaigns
// @access Public
const getCampaigns = async (req, res) => {
  // get all campaigns from the db
  const campaigns = await Campaign.find().sort({ createdAt: -1 }).lean();

  // check if campaign exist
  if (!campaigns?.length) {
    return res.status(400).json({ message: "No campaigns found!" });
  }

  // return campaigns if it exist
  res.status(200).json(campaigns);
};

// @desc get a single campaign
// @route GET /campaigns/:id
// @access Public
const getCampaign = async (req, res) => {
  const { id } = req.params;

  // check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid campaign ID" });
  }

  // find the campaign in the db
  const campaign = await Campaign.findById(id).lean();

  // check if that campaign exists
  if (!campaign) {
    return res.status(400).json({ message: "No campaign found" });
  }

  res.status(200).json(campaign);
};

// @desc create a new campaign
// @route POST /campaigns
// @access Public
const createCampaign = async (req, res) => {
  const { title, description, target } = req.body;

  // check if all fields are provided
  if (!title || !description || !target) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // create the new campaign
  try {
    const campaign = await Campaign.create({ title, description, target });

    res
      .status(201)
      .json({ message: "Campaign successfully created", campaign });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getCampaigns, getCampaign, createCampaign };
