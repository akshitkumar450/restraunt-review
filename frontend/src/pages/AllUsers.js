import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import { userService } from "../services/UserServices";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [toggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleForm(false);
    console.log(name, email, password, role);
    const isAdmin = role === "admin" ? true : false;

    try {
      const data = await userService.createUser({
        name,
        email,
        password,
        isAdmin,
      });
      handleToggle(!toggle);
      toast.success("user added");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="grid">
      {toggleForm && (
        <Card className="!w-1/2 mx-auto p-5 my-5 ">
          <form onSubmit={handleSubmit} className="grid gap-y-3">
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                label="name"
                placeholder="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="email"
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="password"
                label="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div>
              <FormControl>
                <Select
                  className="h-full"
                  value={role}
                  id="demo-simple-select-1"
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleChange}>
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
            </div> */}
            <div className="flex gap-2">
              <Button type="submit" variant="contained">
                Add User
              </Button>
              <Button
                onClick={() => setToggleForm(false)}
                color="error"
                variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
      {!toggleForm && (
        <div className="mx-auto my-10">
          <Button
            type="submit"
            onClick={() => setToggleForm(true)}
            variant="contained">
            Add New User
          </Button>
        </div>
      )}

      <>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} handleToggle={handleToggle} />
        ))}
      </>
      <Pagination count={10} className="mx-auto my-10" />
    </div>
  );
}

export default AllUsers;
