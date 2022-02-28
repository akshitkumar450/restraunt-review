// import { restrosData } from "../data/restroData";

import axios from "axios";

const API_URL = "http://localhost:5000";

export const postService = {
  getRestraunts: async () => {
    const restrosData = await axios.get(`${API_URL}/restros`);
    // console.log(restrosData.data);
    return {
      data: restrosData.data,
    };
  },

  createRestraunt: async (data) => {
    const { name, location } = data;
    const restrosData = await axios.post(`${API_URL}/restros`, {
      name,
      location,
    });
    return {
      data: restrosData.data,
    };
  },

  updateRestraunt: async (id, data) => {
    const { editName, editLocation } = data;
    const restrauntAfterUpdate = await axios.put(`${API_URL}/restros/${id}`, {
      name: editName,
      location: editLocation,
    });
    console.log(restrauntAfterUpdate);
    return;
  },

  deleteRestraunt: async (id) => {
    const restrauntAfterDelete = await axios.delete(`${API_URL}/restros/${id}`);
    console.log(restrauntAfterDelete);
    return;
  },

  // addReview: async (data) => {
  //   const { comment, rating } = data;
  //   console.log(comment, rating);
  //   return {
  //     data: {
  //       date: new Date().toDateString(),
  //       rating: rating,
  //       comment,
  //     },
  //   };
  // },
};
