// entrySchema.js
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  jobTitle: {
    type: String,
    required: true,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    maxlength: 100,
  },
  salary: {
    type: String,
    required: true,
    maxlength: 100,
  },
  schoolDescription: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  jobDescription: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  requirements: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  otherBenefits: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  contactEmail: {
    type: String,
    required: true,
    maxlength: 100,
  },
  website: {
    type: String,
    required: false,
    maxlength: 100,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("entry", entrySchema);
