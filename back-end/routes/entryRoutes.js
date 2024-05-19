// entryRoutes.js
const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Route for creating a new entry
router.post("/entries", entryController.createEntry);

// Route for fetching all entries
router.get("/entries", entryController.getAllEntries);

// Route for fetching a single entry
router.get("/entries/:id", entryController.getEntryById);

// Route for updating an entry
router.put("/entries/:id", entryController.updateEntry);

// Route for deleting an entry
router.delete("/entries/:id", entryController.deleteEntry);

module.exports = router;
