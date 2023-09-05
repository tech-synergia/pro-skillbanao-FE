import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;

function HomeS3() {
  const [webDetails, setWebDetails] = useState("");

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

  const fetchWebsiteDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/website/details`);
      // console.log(response.data);
      setWebDetails(response.data.detail[0]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // console.log(webDetails);

  return (
    <div id="section_3">
      <div className="boxes">
        <h1>{webDetails.professionals}+</h1>
        <span>Professionals</span>
      </div>
      <div className="boxes">
        <h1>{webDetails.chats}+</h1>
        <span>Chats</span>
      </div>
      <div className="boxes">
        <h1>{webDetails.customers}+</h1>
        <span>Customers</span>
      </div>
    </div>
  );
}

export default HomeS3;
