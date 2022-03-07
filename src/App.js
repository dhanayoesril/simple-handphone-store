import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailsProduct from './pages/DetailsProduct';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/details" element={<DetailsProduct/>}/>
    </Routes>
  )
}

export default App