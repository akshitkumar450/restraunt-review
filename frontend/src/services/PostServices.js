// import { restrosData } from "../data/restroData";

import axios from "axios";

const API_URL = "http://localhost:5000";

// const API = axios.create({
//   baseURL: "http://localhost:5000/",
//   headers: {
//     token: JSON.parse(localStorage.getItem("user-token")),
//   },
// });

// // const config = {
// //   headers: {
// //     token: user?.token,
// //   },
// // };

export const postService = {
  getRestraunts: async () => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const restrosData = await axios.get(`${API_URL}/restros`, config);
    return {
      data: restrosData.data,
    };
  },

  createRestraunt: async (data) => {
    const { name, location } = data;
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const restrosData = await axios.post(
      `${API_URL}/restros`,
      {
        name,
        location,
      },
      config
    );
    return {
      data: restrosData.data,
    };
  },

  updateRestraunt: async (id, data) => {
    const { editName, editLocation } = data;
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const restrauntAfterUpdate = await axios.put(
      `${API_URL}/restros/${id}`,
      {
        name: editName,
        location: editLocation,
      },
      config
    );
    // console.log(restrauntAfterUpdate);
    return restrauntAfterUpdate.data;
  },

  updateRating: async (id, data) => {
    const { name, location, rating, img } = data;
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const restrauntRating = await axios.put(
      `${API_URL}/restros/${id}`,
      {
        name,
        location,
        rating,
        img,
      },
      config
    );
    // console.log(restrauntRating);
    return;
  },

  deleteRestraunt: async (id) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const restrauntAfterDelete = await axios.delete(
      `${API_URL}/restros/${id}`,
      config
    );
    return restrauntAfterDelete;
  },

  addReview: async (data) => {
    const { comment, rating, restrauntId } = data;
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    const newComment = await axios.post(
      `${API_URL}/reviews`,
      {
        comment,
        rating,
        restrauntId,
      },
      config
    );
    return {
      data: newComment.data,
    };
  },

  getAllReviews: async (id) => {
    const reviews = await axios.get(`${API_URL}/restros/${id}`);
    return {
      data: {
        reviews: reviews.data,
      },
    };
  },
};
