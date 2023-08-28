import React from "react";
import SearchBar from "../components/SearchBar";
import PersonDetails from "../components/PersonDetails";
import BestConsultancy from "../components/BestConsultancy";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ChatWithCA() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <PersonDetails />
      {/* <BestConsultancy/> */}
      <Footer />
    </>
  );
}

export default ChatWithCA;
