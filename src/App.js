import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './Component/Form/Form';
import DisplayPage from './Component/Home/Home';

const App = () => {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<DisplayPage/>} />
        <Route exact path="/Form" element={<FormPage/>} />
        <Route path="/edit/:id" element={<FormPage/>} />
      </Routes>
    </Router>
  );
};

export default App;



