const fs = require('fs'); // File system module to handle file deletion
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer upload middleware
const upload = multer({ storage }).single('file');

// POST route to handle file upload
router.post('/fileUpload/:id', upload, async (req, res) => {
  try {
    const updatingCab = await Cab.findById(req.params.id);
    if (!updatingCab) {
      return res.status(404).json({
        success: false,
        message: 'Failed to find the cab'
      });
    }

    // Push the file path to the content array of the cab
    updatingCab.content.push(req.file.path);
    await updatingCab.save();

    // Construct the response object with file URLs
    const fileUrl = `${req.protocol}://${req.get('host')}${req.file.path}`;

    // Respond with success message and file details
    return res.status(200).json({
      success: true,
      url: fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ success: false, error: error });
  }
});

// GET route to fetch all images
// Route to get all images by cab ID
// Route to get all cabs and their images
router.get('/cabs', async (req, res) => {
  try {
    const cabs = await Cab.find({});
    if (!cabs || cabs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No cabs found',
      });
    }

    // Map cabs to include their ID and content
    const cabData = cabs.map((cab) => ({
      id: cab._id,
      images: cab.content.map((filePath) => ({
        url: `${req.protocol}://${req.get('host')}/${filePath}`,
        fileName: filePath.split('/').pop(),
      })),
    }));

    return res.status(200).json({
      success: true,
      cabs: cabData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});



router.delete('/fileUpload/:id', async (req, res) => {
  // Log the incoming request parameters and body
  console.log('Received DELETE request:');
  console.log('Cab ID:', req.params.id);
  console.log('Request Body:', req.body);

  const { filePath } = req.body; // Expecting an object with filePath to delete

  try {
    // Log the DB query
    console.log('Attempting to find cab with ID:', req.params.id);
    
    // Find the cab by ID in the database
    const updatingCab = await Cab.findById(req.params.id);

    // Log the result of the find query
    console.log('DB Query Result (Cab document):', updatingCab);

    if (!updatingCab) {
      console.log('No cab found with the given ID.');
      return res.status(404).json({
        success: false,
        message: 'Cab not found'
      });
    }

    // Remove the specified file path from the content array using $pull
    console.log(`Attempting to delete file path: ${filePath} from cab with ID: ${req.params.id}`);
    
    
    const result = await Cab.updateOne(
      { _id: req.params.id },
      { $pull: { content: filePath } } // Using $pull to remove the filePath
    );

    // Log the result of the update operation
    console.log('DB Update Result:', result);

    if (result.modifiedCount === 0) {
      console.log('No matching file found to delete.');
      return res.status(404).json({
        success: false,
        message: 'No matching file found to delete'
      });
    }

    // Optionally, delete the file from the file system
    fs.unlink(path.join(__dirname,'../C:/Project/FinalProjectCSMS/BACKEND/routes/uploads', filePath), (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully in filesystem:', filePath);
      }
    });

    return res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


// Toggle approval status
router.patch('/toggle/:id', async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    if (!cab) {
      return res.status(404).json({
        success: false,
        message: 'Cab not found'
      });
    }

    // Toggle the approval status
    cab.approved = !cab.approved;
    const updatedCab = await cab.save();

    return res.json({
      success: true,
      cab: updatedCab, // Include the updated cab in the response
    });

  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});




module.exports = router;




