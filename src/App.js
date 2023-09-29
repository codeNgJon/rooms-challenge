import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './components/Rooms/Rooms';
import Booking from './components/Booking/Booking';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/rooms" element={<Rooms />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>
    </Router >
  );
}

export default App;