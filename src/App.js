import './App.css'
import Form from './components/form';
import AudioTable from './components/AudioTable';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <h1>File Upload</h1>
              <Form />
              <AudioTable />
            </div>
          } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;