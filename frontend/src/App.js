// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import UserBox from './components/UserBox';
import FazerUpload from './components/UploadBox';
import ExamsBox from './components/ExamsBox';
import HomeBox from "./components/HomeBox";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<RegisterBox />} />
        <Route path="/user" element={<UserBox />} />
        <Route path="/upload" element={<FazerUpload />} />
        <Route path="/exams" element={<ExamsBox />} />
        <Route path="/" element={<HomeBox />} />
      </Routes>
    </Router>
  );
}

export default App;
