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
  const [highestRaing, setHighestRating] = useState("");
  const [lowestRating, setLlowestRating] = useState("");
  const [currentRating, setCurrentRating] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    // console.log("runned");
    const fetchData = async (id) => {
      try {
        const currentRestro = await postService.getAllReviews(id);
        // console.log(currentRestro.data.reviews, "curret restro");
        // console.log(currentRestro.data.lowestRating, "lowest ");
        // console.log(currentRestro.data.highestRating, "high");

        setHighestRating(currentRestro.data.highestRating);
        setLlowestRating(currentRestro.data.lowestRating);

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
      setCurrentRating(data.data.review);
      // console.log(data.data.avgRating, "avg");
      // setRating(data.data.avgRating);
      // restro.rating = data.data.avgRating;
      // setRestro({ ...restro, rating: data.data.avgRating });
      setComment("");
      setRating(0);
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

          <div className="grid grid-cols-3 mx-auto max-w-5xl gap-5 justify-center">
            {/* lowestRating */}
            <div className="col-span-1">
              <h1 className="text-center">Lowest Rating</h1>
              {lowestRating && (
                <Review
                  name={lowestRating?.user?.name}
                  comment={lowestRating?.comment}
                  date={lowestRating?.createdAt}
                  reviewRating={lowestRating?.rating}
                />
              )}
            </div>

            {/* highest rating */}
            <div className="col-span-1">
              <h1 className="text-center">highest Rating</h1>
              {highestRaing && (
                <Review
                  name={highestRaing?.user?.name}
                  comment={highestRaing?.comment}
                  date={highestRaing?.createdAt}
                  reviewRating={highestRaing?.rating}
                />
              )}
            </div>

            {/* current rating */}
            <div className="col-span-1">
              <h1 className="text-center">current Rating</h1>
              {currentRating && (
                <Review
                  name={currentRating?.user?.name}
                  comment={currentRating?.comment}
                  date={currentRating?.createdAt}
                  reviewRating={currentRating?.rating}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-4xl text-center">No Data for {id}</h1>
      )}
    </div>
  );
}

export default Details;
