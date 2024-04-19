import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioTable = () => {
  const [files, setFiles] = useState([]);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/files');
        console.log(response.data);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();

    // Set up periodic polling to refresh file list
    const intervalId = setInterval(fetchFiles, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  }, []);
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Patient Age</th>
            <th>Recording Date</th>
            <th>Listen</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.doctorName}</td>
              <td>{file.patientName}</td>
              <td>{file.patientAge}</td>
              <td>{file.recordingDate}</td>
              <td>
                <audio controls>
                  <source src={file.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Uploaded Files:</h2>
      {files.length > 0 ? renderTable() : <p>No files uploaded yet.</p>}
    </div>
  );
};

export default AudioTable;
