import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { postService } from "../services/PostServices";

function Review({ comment, name, date, reviewRating, id, handleToggle }) {
  const user = useSelector((state) => state.user.user);
  const [rating, setRating] = useState(reviewRating);
  const [editable, setEditable] = useState(false);
  const [editComment, setEditComment] = useState(comment);

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

  // console.log(user.name, name);
  const handleSave = async () => {
    const updatedReview = await postService.updateReview(id, { editComment });
    handleToggle();
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
    setEditComment(comment);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleDelete = async () => {
    const deletedReview = await postService.deleteReview(id);
    // console.log(deletedReview);
    handleToggle();
  };

  return (
    <div className="ring-1 ring-gray-300 p-2 rounded-lg bg-gray-300">
      <p className="font-bold">{name}</p>

      {editable ? (
        <input
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
        />
      ) : (
        <p className="italic">{comment}</p>
      )}

      <p className="font-semibold">{new Date(date).toDateString()}</p>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          handleRating(newValue);
        }}
      />
      {(user.name === name || user.isAdmin) && (
        <>
          {editable ? (
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
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}

export default Review;
