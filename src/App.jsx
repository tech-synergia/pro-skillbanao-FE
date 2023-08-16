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
import Blogs from "./components/Blogs";

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
        <Route path="/userSuccess" element={<UerSuccess />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
