import { TextareaAutosize, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Review from "../components/Review";
import RestroCard from "../components/RestroCard";
import { restrosData } from "../data/restroData";
import { postService } from "../services/PostServices";

function Details() {
  const { id } = useParams();
  const history = useHistory();

  const [restro, setRestro] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    console.log("runned");
    const fetchData = async (id) => {
      try {
        const currentRestro = await postService.getAllReviews(id);
        console.log(currentRestro.data.reviews, "curret restro");
        const allReviews = currentRestro.data.reviews.review;
        setRestro({ ...currentRestro.data.reviews });
        setReviews(allReviews);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData(id);
  }, [id, history, toggle]);

  const addComment = async (e) => {
    e.preventDefault();
    // console.log(comment, rating);
    try {
      const data = await postService.addReview({
        comment,
        rating,
        restrauntId: id,
      });
      console.log(data.data.avgRating);
      // setRating(data.data.avgRating);
      // restro.rating = data.data.avgRating;
      // setRestro({ ...restro, rating: data.data.avgRating });

      handleToggle();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5">
      {restro ? (
        <>
          <RestroCard restro={restro} />
          <div className="w-full flex flex-col items-center mx-auto my-10">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Maximum 50 character"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-3/4 outline-none border-0 ring-1 ring-gray-400 rounded-lg p-2"
            />

            <Rating
              className="my-10"
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <Button onClick={addComment} variant="contained">
              Add Comment
            </Button>
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            {reviews.map((review, idx) => {
              return (
                <Review
                  key={idx}
                  comment={review.comment}
                  date={review.createdAt}
                  name={review.user.name}
                  reviewRating={review.rating}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="text-4xl text-center">No Data for {id}</h1>
      )}
    </div>
  );
}

export default Details;
