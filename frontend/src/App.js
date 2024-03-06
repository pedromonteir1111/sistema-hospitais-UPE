// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import FazerUpload from './components/UploadBox';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<RegisterBox />} />
        <Route path="/upload" element={<FazerUpload />} />
        {/* <Route path="/home" element={<HomeBox />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
