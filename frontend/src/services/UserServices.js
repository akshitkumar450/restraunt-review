import { usersData } from "../data/userData";

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
    return {
      data: usersData,
    };
  },

  deleteUser: async (id) => {
    let temp = usersData.filter((item) => item.id !== id);
    return {
      data: temp,
    };
  },

  addUser: async (data) => {
    const { name, email, password, role } = data;
    return {
      data: {
        id: Math.random() + 1,
        name,
        email,
        password,
        role,
      },
    };
  },
};
