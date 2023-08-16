import React from "react";
import SearchBar from "./SearchBar";
import PersonDetails from "./PersonDetails";
import BestConsultancy from "./BestConsultancy";
import Navbar from "../Navbar";
import Footer from "../Footer";

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
