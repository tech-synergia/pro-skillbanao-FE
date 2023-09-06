function HomeS3({ webDetails }) {
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
