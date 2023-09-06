import HomeS1 from "../components/HomeS1";
import HomeS3 from "../components/HomeS3";
// import HomeS4 from "../components/HomeS4";
import HomeS2 from "../components/HomeS2";
import Testimonials from "../components/testimonials";
import Pros from "../components/Pros";
import Footer from "../components/Footer";
import "../scss/Home.scss";
import Navbar from "../components/Navbar";
import LatestBlogs from "../components/LatestBlogs";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Home() {
  const [webDetails, setWebDetails] = useState("");

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/website/details`);
        // console.log(response.data);
        setWebDetails(response.data.detail[0]);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchWebsiteDetails();
  }, []);

  return (
    <div className="Home">
      <Navbar />
      <HomeS1 />
      {/* <HomeCarousel /> */}
      <Pros webDetails={webDetails} />
      <LatestBlogs />
      <Testimonials />
      <HomeS3 webDetails={webDetails} />
      <HomeS2 />
      {/* <HomeS4 /> */}
      <Footer />
    </div>
  );
}

export default Home;
