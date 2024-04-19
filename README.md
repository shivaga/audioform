# Audio File Upload Web Application

This is a web application that allows users to upload audio files along with form data. The client-side is built with React.js and runs on port 3000, while the server-side is built with Node.js and Express and runs on port 8000. Audio files are stored on the server, and form data is saved to MongoDB. When retrieving data, form data is fetched from MongoDB, and audio files are served from the server.

## Prerequisites

Before running the program, make sure you have Node.js and MongoDB installed on your machine.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/shivaga/audioform.git
   ```

2. Install dependencies:
   ```
   cd your-repository
   npm install
   ```

## Running the Server

### Server-side

To run the server-side, navigate to the server directory and use the following command:
```
node app.js
```

The server will start running on port 8000 by default.

### Client-side

To run the client-side, use the following command:
```
npm start
```

The client-side application will start running on port 3000.

## Usage

1. Open your web browser and navigate to http://localhost:3000.

2. Fill in the form with the required data:
   - Doctor Name
   - Patient Name
   - Patient Age
   - Recording Date
   - Audio File (Choose a file to upload)

3. Submit the form.

4. The server will store the audio file on the server and save the form data to MongoDB.

5. When retrieving data, the server will fetch form data from MongoDB, and audio files will be served from the server.

## Additional Notes

- All audio files are stored on the server in a designated directory (e.g., uploads/).
- Form data is saved to MongoDB using a MongoDB database.
- Make sure to configure MongoDB connection settings in your server-side code.
