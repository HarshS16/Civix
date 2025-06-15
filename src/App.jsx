import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import './ButtonHover.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
  );
}

export default App;