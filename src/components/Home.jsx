import HomeS1 from "./home/HomeS1";
import HomeS3 from "./home/HomeS3";
import HomeS4 from "./home/HomeS4";
import HomeS2 from "./home/HomeS2";
import HomeCarousel from "./home/HomeCarousel";
import Testimonials from "./home/testimonials";
import Pros from "./Pros";
import Footer from "./Footer";
import "../scss/Home.scss";
import Navbar from "./Navbar";
import LatestBlogs from "./home/LatestBlogs";

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <HomeS1 />
      {/* <HomeCarousel /> */}
      <Pros />
      <LatestBlogs />
      <Testimonials />
      <HomeS3 />
      <HomeS2 />
      {/* <HomeS4 /> */}
      <Footer />
    </div>
  );
}

export default Home;
