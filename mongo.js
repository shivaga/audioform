const mongoose=require("mongoose")

//Configuring environment files
require("dotenv").config();
const MONGO_URI =process.env.db_api_access;
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log("error",e)

    console.log('failed');
})


const recordingSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientAge: {
    type: Number,
    required: true
  },
  recordingDate: {
    type: Date,
    required: true
  },
  audioFile: {
    type: String,
    required: true
  }
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;