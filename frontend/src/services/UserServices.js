export const userService = {
  logInUser: async (email, password) => {
    return {
      data: {
        email,
        name: "Random user 1",
        role: Math.random() > 0.5 ? "user" : "admin",
        isAdmin: false, //true// backend
        token: Math.floor(Math.random() * 15000),
      },
    };

    // for backend api
    // return {
    //   error: true,
    //   message: "Invalid Creds",
    // };
  },
  signUpUser: async (name, email, password) => {
    return {
      data: {
        name,
        email,
        role: Math.random() > 0.5 ? "user" : "admin",
        isAdmin: false, //true// backend
        token: Math.floor(Math.random() * 15000),
      },
    };
  },
};
