import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

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

  console.log(user.name, name);
  const handleSave = () => {};
  const handleEdit = () => {};
  const handleCancel = () => {};
  const handleDelete = () => {};
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
      {user.name === name && (
        <>
          <div>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="!m-2"
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              className="!m-2"
              onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Review;
