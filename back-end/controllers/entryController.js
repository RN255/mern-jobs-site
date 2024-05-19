// entryController.js 
const Entry = require("../models/entrySchema"); // Import the Mongoose model

// Controller function for creating a new entry
exports.createEntry = async (req, res) => {
  try {
    // Create a new entry based on the data in the request body
    const newEntry = new Entry(req.body);

    // Save the new entry to the database
    const savedEntry = await newEntry.save();

    // Send a response with the saved entry
    res.status(201).json(savedEntry);
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ error: error.message });
  }
};

// Controller function for fetching all entries
exports.getAllEntries = async (req, res) => {
  try {
    // Use Mongoose's find method to retrieve all entries from the database
    const entries = await Entry.find();

    // Send the retrieved entries as a JSON response
    res.status(200).json(entries);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
};

// Controller function for fetching a single entry by ID
exports.getEntryById = async (req, res) => {
  const entryId = req.params.id; // Get the entry ID from the request parameters

  try {
    // Use Mongoose's findById method to retrieve the entry by its ID
    const entry = await Entry.findById(entryId);

    if (!entry) {
      // If the entry is not found, return a 404 response
      return res.status(404).json({ message: "Entry not found" });
    }

    // Send the retrieved entry as a JSON response
    res.status(200).json(entry);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
};

// Controller function for updating an entry by ID
exports.updateEntry = async (req, res) => {
  const entryId = req.params.id; // Get the entry ID from the request parameters
  const updateData = req.body; // Get the data to update from the request body

  try {
    // Use Mongoose's findByIdAndUpdate method to update the entry by its ID
    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      updateData,
      { new: true } // Return the updated entry (optional)
    );

    if (!updatedEntry) {
      // If the entry is not found, return a 404 response
      return res.status(404).json({ message: "Entry not found" });
    }

    // Send the updated entry as a JSON response
    res.status(200).json(updatedEntry);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
};

// Controller function for deleting an entry by ID
exports.deleteEntry = async (req, res) => {
  const entryId = req.params.id; // Get the entry ID from the request parameters

  try {
    // Use Mongoose's findByIdAndDelete method to delete the entry by its ID
    const deletedEntry = await Entry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      // If the entry is not found, return a 404 response
      return res.status(404).json({ message: "Entry not found" });
    }

    // Send a success message as a JSON response
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
};
