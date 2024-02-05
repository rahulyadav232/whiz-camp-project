import React from 'react';
import './App.css';
import SignUp from './components/signup/SignUp';
import FormDataTable from './components/formdatatable/FormDataTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/table" element={<FormDataTable/>} />
      </Routes>
    </Router>
  );
}

export default App;
