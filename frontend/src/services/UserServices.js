import axios from "axios";
import { usersData } from "../data/userData";

const API_URL = "http://localhost:5000";

export const userService = {
  logInUser: async (data) => {
    const { email, password } = data;
    console.log(email, password);
    const loggedInUser = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    if (loggedInUser?.data) {
      localStorage.setItem("user", JSON.stringify(loggedInUser.data));
      console.log(loggedInUser.data);
      return {
        data: loggedInUser.data,
      };
    }
  },

  signUpUser: async (data) => {
    const { name, email, password } = data;
    const createdUser = await axios.post(`${API_URL}/user/signup`, {
      name,
      email,
      password,
    });
    // console.log(createdUser.data);
    return {
      data: createdUser.data,
    };
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
    const { name, email, password } = data;
    const users = await axios.post(`${API_URL}/user`, {
      name,
      email,
      password,
      // isAdmin,
    });
    // console.log(users.data);
    return {
      data: {
        name,
        email,
        password,
        // isAdmin,
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
