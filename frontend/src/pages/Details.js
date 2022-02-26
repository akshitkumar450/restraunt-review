import {
  TextareaAutosize,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Review from "../components/Review";
import RestroCard from "../components/RestroCard";
import { restrosData } from "../data/restroData";
import { postService } from "../services/PostServices";

function Details() {
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  const [restro, setRestro] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  useEffect(() => {
    const data = restrosData.find((item) => (+item.id === +id ? item : ""));
    if (data) setRestro(data);
    else history.push("/");
  }, [id, history]);

  const addComment = (e) => {
    e.preventDefault();
    const addedComment = async () => {
      const data = await postService.addReview({ comment, rating });
      // console.log({ ...data.data, name: user.name });
      const newComment = { ...data.data, name: user.name, rating: rating };
      const newReviews = [...restro.reviews, newComment];
      // console.log(newReviews);
      restro.reviews = newReviews;
    };
    addedComment();
  };

  return (
    <div className="p-5">
      {restro ? (
        <>
          <RestroCard restro={restro} />
          <div className="w-full flex flex-col items-center mx-auto my-10">
            <div className=" w-3/4 flex items-start justify-center gap-2">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Maximum 50 character"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-3/4 outline-none border-0 ring-1 ring-gray-400 rounded-lg p-2"
              />

              <FormControl className="h-10">
                <Select
                  className="h-full"
                  id="demo-simple-select-2"
                  value={rating}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleRating}>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-5">
              <Button onClick={addComment} variant="contained">
                Add Comment
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            {restro.reviews.map((review, idx) => (
              <Review
                key={idx}
                comment={review.comment}
                date={review.date}
                name={review.name}
                reviewRating={review.rating}
              />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-4xl text-center">No Data for {id}</h1>
      )}
    </div>
  );
}

export default Details;
