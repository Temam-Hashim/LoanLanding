import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Test from "./components/Test";

import "./App.css";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
