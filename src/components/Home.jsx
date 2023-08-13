import HomeS2 from "./home/HomeS2";
import HomeS1 from "./home/HomeS1";
import HomeS3 from "./home/HomeS3";
import HomeS4 from "./home/HomeS4";
import HomeS5 from "./home/HomeS5";
import HomeS6 from "./home/HomeS6";
import Pros from "./Pros";
import Footer from './Footer'
import '../scss/Home.scss'
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="Home">
      <Navbar/>
      <HomeS1 />
      <HomeS2 />
      <HomeS3 />
      <HomeS4 />
      <HomeS5 />
      <HomeS6 />
      <Pros />
      <Footer />
    </div>
  );
}

export default Home;
