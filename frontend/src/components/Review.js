import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Review({ comment, name, date, reviewRating }) {
  const user = useSelector((state) => state.user.user);
  const [rating, setRating] = useState(reviewRating);

  useEffect(() => {
    setRating(reviewRating);
  }, [reviewRating]);

  const handleRating = (newValue) => {
    if (!user.isAdmin) {
      setRating(newValue);
    } else if (user.isAdmin) {
      toast.error("you are not logged in as same user");
    }
  };

  return (
    <div className="ring-1 ring-gray-300 p-2 rounded-lg bg-gray-300">
      <p className="font-bold">{name}</p>
      <p className="italic">{comment}</p>
      <p className="font-semibold">{new Date(date).toDateString()}</p>
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
