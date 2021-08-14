import React from "react";
import UserItem from "../UserItem/UserItem";

import "./UsersList.css";

const UsersList = ({ users, onItemClick }) => {
  if (users.length === 0) {
    return <h3>No users found.</h3>;
  }
  return (
    <ul className="users-list__container">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          profileImage={user.profileImage}
          fileName={user.fileName}
          clicked={user.clicked}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

export default UsersList;
