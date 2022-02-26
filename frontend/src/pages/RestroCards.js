import React, { useEffect, useState } from "react";
import SingleCard from "../components/RestroCard";
import { postService } from "../services/PostServices";
import Pagination from "@mui/material/Pagination";

export default function RestroCard() {
  const [restros, setRestros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getAllData();
      // console.log(data);
      setRestros(data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-y-3 my-10">
      {restros.data?.map((restro) => (
        <SingleCard key={restro.id} restro={restro} />
      ))}
      <Pagination count={10} className="mx-auto" />
    </div>
  );
}
