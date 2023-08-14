import HomeS1 from "./home/HomeS1";
import HomeS3 from "./home/HomeS3";
import HomeS4 from "./home/HomeS4";
import Pros from "./Pros";
import Footer from "./Footer";
import "../scss/Home.scss";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <HomeS1 />
      <HomeS3 />
      <HomeS4 />
      <Pros />
      <Footer />
    </div>
  );
}

export default Home;
