import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [file, setFile] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [recordingDate, setRecordingDate] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('doctorname', doctorName);
    formData.append('patientname', patientName);
    formData.append('patientage', patientAge);
    formData.append('recordingdate', recordingDate);
    

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("File uploaded succesfully");
      // Reset input fields
      setFile(null);
      setDoctorName('');
      setPatientName('');
      setPatientAge('');
      setRecordingDate('');
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
    //   alert(response);
      alert('Error uploading file:', error);
    }
  };

  return (
    <div >
      <input type="text" placeholder="Doctor Name" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
      <input type="text" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      <input type="number" placeholder="Patient Age" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
      <input type="date" placeholder="Recording Date" value={recordingDate} onChange={(e) => setRecordingDate(e.target.value)} />
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Form;
