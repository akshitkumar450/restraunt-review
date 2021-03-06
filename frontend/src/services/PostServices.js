import axios from "axios";

const API_URL = "http://localhost:5000";
export const postService = {
  getRestraunts: async (page) => {
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    // const page = await axios.get(`${API_URL}/reviews?page=5`);

    const restrosData = await axios.get(
      `${API_URL}/restros?page=${page}&limit=3`,
      config
    );
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
    // console.log(rating);
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
    // console.log(reviews);
    return {
      data: {
        reviews: reviews.data.restro,
        lowestRating: reviews.data.lowestRating,
        highestRating: reviews.data.highestRating,
        currentRating: reviews.data.currentRating,
      },
    };
  },
  deleteReview: async (id) => {
    const deletedReview = await axios.delete(`${API_URL}/reviews/${id}`);
    console.log(deletedReview);
    return {
      data: deletedReview.data,
    };
  },

  updateReview: async (id, data) => {
    const { editComment } = data;
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("user-token")),
      },
    };
    // console.log({ editComment, id });
    const updatedReview = await axios.put(
      `${API_URL}/reviews/${id}`,
      {
        comment: editComment,
      },
      config
    );
    // console.log(updatedReview);
    return {
      data: updatedReview.data,
    };
  },
};
