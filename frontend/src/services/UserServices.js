import axios from "axios";
import { usersData } from "../data/userData";

const API_URL = "http://localhost:5000";

export const userService = {
  logInUser: async (email, password) => {
    return {
      data: {
        email,
        name: "Random user 1",
        // role: Math.random() > 0.5 ? "user" : "admin",
        isAdmin: Math.random() > 0.5 ? true : false,
        // isAdmin: false, //true// backend
        token: Math.floor(Math.random() * 15000),
      },
    };

    // for error
    // return {
    //   error: true,
    //   message: "Invalid Credentials",
    // };
  },
  signUpUser: async (name, email, password) => {
    return {
      data: {
        name,
        email,
        // role: Math.random() > 0.5 ? "user" : "admin",
        isAdmin: Math.random() > 0.5 ? true : false,
        token: Math.floor(Math.random() * 15000),
      },
    };
    // for error
    // return {
    //   error: true,
    //   message: "Invalid Credentials",
    // };
  },

  getAllUsers: async () => {
    const users = await axios.get(`${API_URL}/user`);
    return {
      data: users.data,
    };
  },

  deleteUser: async (id) => {
    const users = await axios.delete(`${API_URL}/user/${id}`);
    console.log(users);
    return {};
  },

  createUser: async (data) => {
    const { name, email, password, isAdmin } = data;
    const users = await axios.post(`${API_URL}/user`, {
      name,
      email,
      password,
      isAdmin,
    });
    // console.log(users.data);
    return {
      data: {
        name,
        email,
        password,
        isAdmin,
      },
    };
  },
  updateUser: async (id, data) => {
    console.log(data, id);
    const { editName, editEmail, editPassword, isAdmin } = data;
    const updatedUser = await axios.put(`${API_URL}/user/${id}`, {
      name: editName,
      email: editEmail,
      password: editPassword,
      isAdmin,
    });
    // console.log(updatedUser.data);
    return {
      data: {
        data: updatedUser.user,
      },
    };
  },
};
