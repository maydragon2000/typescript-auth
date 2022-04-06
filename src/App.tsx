import React from 'react';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import VerifyCode from './pages/VerifyCode/VerifyCode';
import Register from './pages/Register/Register';
import Welcome from './pages/Welcome/Welcome';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "./responsive.css";
import "./style.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="verifycode" element={<VerifyCode />} />
          <Route path="register" element={<Register />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
