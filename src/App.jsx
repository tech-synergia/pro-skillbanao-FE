import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatWithCA from "./components/Chat-with-CA/ChatWithCA";
import Login from "./components/Login";

import Chat from "./components/Chat";
import FirstSignUp from "./components/FirstSignUp";
import UserList from "./components/Userlist";
import SuccessMessage from "./components/FirstSignUp/Success";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat-with-CA" element={<ChatWithCA />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FirstSignUp />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
