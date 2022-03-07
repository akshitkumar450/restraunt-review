import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Button, MenuItem, FormControl, Select } from "@mui/material";
import { userService } from "../services/UserServices";

export default function UserCard({ user, handleToggle }) {
  const [editable, setEditable] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    setEditRole(user.isAdmin ? "admin" : "user");
  }, [user]);

  const defaultValues = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.isAdmin ? "admin" : "user");
    // setEditPassword(user.password);
  };

  const handleEdit = () => {
    setEditable(true);
    defaultValues();
  };

  const handleSave = async (e) => {
    setEditable(false);
    // console.log(editName, editEmail, editPassword, editRole);
    const isAdmin = editRole === "admin" ? true : false;
    // console.log(editName, editRole, editPassword, editEmail);
    setEditPassword("");
    try {
      const data = await userService.updateUser(user.id, {
        editName,
        editEmail,
        isAdmin,
        editPassword,
      });
      console.log(data);
      setEditable(false);
      handleToggle();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    defaultValues();
    setEditable(false);
  };

  const handleDelete = async () => {
    const usersAfterDelete = await userService.deleteUser(user.id);
    console.log(usersAfterDelete);
    handleToggle();
  };
  return (
    <Card className="flex items-start justify-around  mx-auto p-2  my-5">
      <div>
        {editable ? (
          <div className="flex items-center">
            <label>Name:{"  "} </label>
            <input
              type="text"
              value={editName}
              autoFocus
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
        ) : (
          <h1>Name: {user.name}</h1>
        )}

        {editable ? (
          <div className="flex items-center">
            <label>Email:{"  "} </label>
            <input
              type="text"
              autoFocus
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
        ) : (
          <h1>Email: {user.email}</h1>
        )}

        {editable ? (
          <div className="flex items-center">
            <label>Password:{"  "} </label>
            <input
              type="text"
              autoFocus
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
          </div>
        ) : (
          <h1>Password: </h1>
        )}
      </div>
      <div>
        {editable ? (
          <div>
            <FormControl className="h-10">
              <Select
                className="h-full"
                id="demo-simple-select-1"
                value={editRole}
                inputProps={{ "aria-label": "Without label" }}
                readOnly={editable ? false : true}
                onChange={(e) => setEditRole(e.target.value)}>
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"user"}>user</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          <h1>Role: {user.isAdmin ? "admin" : "user"}</h1>
        )}

        {editable ? (
          <>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="!m-2"
              onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" className="!m-2" onClick={handleEdit}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              className="!m-2"
              onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
