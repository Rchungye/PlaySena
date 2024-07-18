import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "./components/Pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App