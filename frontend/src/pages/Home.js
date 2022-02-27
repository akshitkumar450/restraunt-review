import React, { useEffect, useState } from "react";
import RestroCard from "../components/RestroCard";
import { postService } from "../services/PostServices";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { Button, Card, Rating, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function Home() {
  const [restros, setRestros] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getAllData();
      setRestros(data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleForm(false);
    try {
      const data = await postService.postData({ name, location, rating });
      // console.log({ ...data.data });
      setRestros([{ ...data.data }, ...restros]);
      toast.success("added");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="grid gap-y-3 my-10">
      {user.isAdmin && toggleForm && (
        <Card className="!w-1/2 mx-auto p-5 ">
          <form onSubmit={handleSubmit} className="grid gap-y-3">
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                label="name"
                placeholder="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="location"
                label="location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div>
              <Button type="submit" variant="contained">
                Add Restraunt
              </Button>
            </div>
          </form>
        </Card>
      )}

      {!toggleForm && (
        <div className="mx-auto mb-10">
          <Button
            type="submit"
            onClick={() => setToggleForm(true)}
            variant="contained">
            Add New Restraunt
          </Button>
        </div>
      )}

      {restros?.map((restro) => (
        <RestroCard key={restro.id} restro={restro} />
      ))}
      <Pagination count={10} className="mx-auto" />
    </div>
  );
}
