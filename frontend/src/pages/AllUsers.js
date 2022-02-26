import { Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import { usersData } from "../data/userData";

function AllUsers() {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user.role !== "admin") {
      toast.error("you are not logged in as Admin");
      history.push("/");
    }
  }, [user, history]);
  return (
    <div className="grid">
      {usersData.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Pagination count={10} className="mx-auto" />
    </div>
  );
}

export default AllUsers;
