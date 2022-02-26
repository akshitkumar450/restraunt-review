import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Review({ comment, name, date, reviewRating }) {
  const user = useSelector((state) => state.user.user);
  const [rating, setRating] = useState(reviewRating);

  const handleRating = (newValue) => {
    if (!user) {
      toast.error("you are not logged in");
      return;
    }
    if (user?.role === "user") {
      setRating(newValue);
    } else if (user?.role !== "user") {
      toast.error("you are not logged in as user");
    }
  };
  return (
    <div className="ring-1 ring-gray-300 p-2 rounded-lg bg-gray-300 lg:w-1/4">
      <p className="font-bold">{name}</p>
      <p className="italic first-letter:text-gray-600 first-letter:text-2xl">
        {comment}
      </p>
      <p className="font-semibold">{date}</p>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          handleRating(newValue);
        }}
      />
    </div>
  );
}

export default Review;
