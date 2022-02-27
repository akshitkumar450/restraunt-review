import { restrosData } from "../data/restroData";

export const postService = {
  getAllData: async () => {
    return {
      data: restrosData,
    };
  },

  postData: async (data) => {
    const { name, location, rating } = data;
    return {
      data: {
        id: restrosData.length + 1,
        name,
        location,
        rating,
        img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80",
        reviews: [],
      },
    };
  },

  editData: async (data, id) => {
    // console.log(data, id);
    const { editName, editLocation } = data;
    let temp = restrosData.map((item) =>
      item.id === id
        ? { ...item, name: editName, location: editLocation }
        : item
    );
    return {
      data: temp,
    };
  },

  deleteData: async (id) => {
    console.log(id);
    let temp = restrosData.filter((item) => item.id !== id);
    return {
      data: temp,
    };
  },

  addReview: async (data) => {
    const { comment, rating } = data;
    console.log(comment, rating);
    return {
      data: {
        date: new Date().toDateString(),
        rating: rating,
        comment,
      },
    };
  },
};
