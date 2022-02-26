import { restrosData } from "../data/restroData";

export const postService = {
  getAllData: async () => {
    return {
      data: restrosData,
    };
  },
  //   postData: async (data) => {
  //     return {
  //       data,
  //     };
  //   },
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
        date: new Date().toString(),
        rating: rating,
        comment,
      },
    };
  },
};
