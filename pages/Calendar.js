import React from "react";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import { useSession } from "next-auth/client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "react-big-calendar/lib/css/react-big-calendar.css";

function loginCheck() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);
}

export default function MealsCalendar() {
  const [favourites, setFavourites] = useState([]);
  const myEventsList = useRef([]);
  const localizer = momentLocalizer(moment);

  const fetchRecipes = async (res, end) => {
    res = await axios.get("http://localhost:3001/recipes");
    const fMap = res.data.records.map((r) => r.fields);
    end = setFavourites(fMap);
  };

  function calendarRecipes(e) {
    if (myEventsList.current.length === 0) {
      e.map((r) =>
        myEventsList.current.push({
          start: r.date,
          end: r.date,
          title: r.label,
        })
      );
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  function BigCalendar() {
    return (
      <div className="app">
        <Calendar
          localizer={localizer}
          events={myEventsList.current}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  }

  return (
    <div>
      <div>{loginCheck()}</div>
      <TopNavbar />
      <div className= "calendar-background">
      {calendarRecipes(favourites)}
      <BigCalendar />
      <br /></div>
      <Footer />
    </div>
  );
}
