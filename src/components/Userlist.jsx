import React from "react";
import "./Userlist.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";

const users = [
  { id: 1, name: "John Doe", photo: "https://picsum.photos/800/600?random=2" },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    name: "Alex Johnson",
    photo: "https://picsum.photos/800/600?random=2",
  },
  { id: 1, name: "John Doe", photo: "https://picsum.photos/800/600?random=2" },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    name: "Alex Johnson",
    photo: "https://picsum.photos/800/600?random=2",
  },
  { id: 1, name: "John Doe", photo: "https://picsum.photos/800/600?random=2" },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    name: "Alex Johnson",
    photo: "https://picsum.photos/800/600?random=2",
  },
  // Add more users here...
];

const UserLists = () => {
  return (
    <div className="users">
      <h3>People who needs you</h3>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.photo} alt={user.name} className="user-photo" />
            <p className="user-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function UserList() {
  return (
    <>
      <Navbar />
      <UserLists />
      <Footer />
    </>
  );
}

export default UserList;
