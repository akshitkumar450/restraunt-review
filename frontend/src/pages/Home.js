import React, { useEffect, useState } from "react";
import RestroCard from "../components/RestroCard";
import { postService } from "../services/PostServices";
import Pagination from "@mui/material/Pagination";

export default function Home() {
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
        <RestroCard key={restro.id} restro={restro} />
      ))}
      <Pagination count={10} className="mx-auto" />
    </div>
  );
}
