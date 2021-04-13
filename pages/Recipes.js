import { useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import axios from "axios";
import Favourites from "./components/apiComponents/Favourites";
import { v4 as uuidv4 } from "uuid";

function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);
}

export default function recipes() {
  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/recipes");
      // setFavourites(await res.data.records.map((r) => r.fields));
      setFavourites(await res.data.records);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(async () => {
    fetchRecipes();
  }, []);

  const [favourites, setFavourites] = useState([]);

  return (
    <>
      <div>{loginCheck()}</div>
      <TopNavbar />
      <h1>These are your favourite recipes!</h1>
        {favourites.map((r) => (
          <Favourites key={uuidv4()} recipe={r} />
        ))}
      <Footer />
    </>
  );
}
