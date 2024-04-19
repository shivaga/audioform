const express = require("express")
const cors = require("cors")
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// Importing model
const Recording = require('./mongo');
// Creating instance of an express application
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//For audiofile storage and retreival
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware for file uploads
app.use(fileUpload());

// Get request on the server side
app.get('/',(req,res)=>{
  console.log("Server started");
  res.send("Server side");
})

// Endpoint for file upload
app.post('/upload', (req, res) => {
  //Checking if there is a file or not 
  console.log("Hi");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const { doctorname, patientname, patientage, recordingdate } = req.body;
  const audioFilename = `${uuidv4()}${path.extname(uploadedFile.name)}`;
  const uploadPath = path.join(__dirname, 'uploads', audioFilename);
  const metadata = { doctorname, patientname, patientage, recordingdate, filename: audioFilename };
  // Save file metadata and associated data to MongoDB
  const recording = new Recording({
    doctorName:doctorname,
    patientName:patientname,
    recordingDate:recordingdate,
    patientAge:patientage,
    audioFile:audioFilename // Store the filename of the audio file
  });
  // Save other data to the mongodb
  recording.save();

  // Save file 
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
});


// Retrieve entire data with associated audio file
app.get('/files', async (req, res) => {
  try {
    const recordings = await Recording.find();
    // Map each recording to include audio URL
    const recordingsWithAudioUrl = recordings.map(recording => {
      return {
        ...recording.toObject(),
        audioUrl: `http://localhost:8000/uploads/${recording.audioFile}` // URL to retrieve the audio file
      };
    });
    res.json(recordingsWithAudioUrl);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
