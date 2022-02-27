import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import { userService } from "../services/UserServices";

function AllUsers() {
  // const history = useHistory();
  // const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   if (!user.isAdmin) {
  //     toast.error("you are not logged in as Admin");
  //     history.push("/");
  //   }
  // }, [user, history]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAllUsers();
      // console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="grid">
      {users.data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Pagination count={10} className="mx-auto" />
    </div>
  );
}

export default AllUsers;
