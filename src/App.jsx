import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatWithCA from "./components/Chat-with-CA/ChatWithCA";
import Login from "./components/Login";
import Home from "./components/Home";
import Chat from "./components/Chat";
import FirstSignUp from "./components/FirstSignUp";
import UserList from "./components/Userlist";
import SuccessMessage from "./components/FirstSignUp/Success";
import UerSuccess from "./components/FirstSignUp/userSuccess";
import AdminPanel from "./components/AdminPanel";
import ProPanel from "./components/ProPanel";
import Professional from './components/FirstSignUp/Professional'

import Blogs from "./components/Blogs";
import User from "./components/FirstSignUp/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-pro" element={<ChatWithCA />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<FirstSignUp />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/propanel" element={<ProPanel />} />
        <Route path="/userSuccess" element={<UerSuccess />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/registerProf" element={<Professional/>} />
        <Route path="/registerUser" element={<User/>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
