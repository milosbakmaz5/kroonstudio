import React, { useCallback, useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/httphook";
import UsersList from "../../components/UsersList/UsersList";
import { Pagination } from "@material-ui/lab";

import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 100,
    perPage: 30,
  });
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://api.github.com/gists/public?per_page=30&page=${pagination.currentPage}`
        );
        setUsers(
          (prevState) =>
            (prevState = responseData.map((user) => {
              const id = user.id;
              const profileImage = user.owner.avatar_url;
              const fileName = Object.keys(user.files)[0];
              const clicked = false;
              return { id, profileImage, fileName, clicked };
            }))
        );
      } catch {}
    };
    fetchUsers();
  }, [pagination, sendRequest]);

  const itemClickedHandler = useCallback((id) => {
    setUsers(
      (prevState) =>
        (prevState = prevState.map((user) => {
          if (user.id === id) {
            return { ...user, clicked: !user.clicked };
          }
          if (user.clicked) {
            return { ...user, clicked: false };
          }
          return user;
        }))
    );
  }, []);

  const pageHandler = (event, value) => {
    setPagination((prevState) => {
      return { ...prevState, currentPage: value };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {error && <h1>Error: {error}</h1>}
      {isLoading && (
        <div className="loading__container">
          <h3>Loading...</h3>
        </div>
      )}
      {!isLoading && users && (
        <UsersList users={users} onItemClick={itemClickedHandler} />
      )}
      <div className="users-pagination__container">
        <Pagination
          page={pagination.currentPage}
          count={pagination.totalPages}
          onChange={pageHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default Users;
