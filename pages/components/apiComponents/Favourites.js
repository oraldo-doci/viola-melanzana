import React, { useState } from "react";
import Ingredients from "./Ingredients";
import { CardDeck, Card, Button, Container } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon } from "react-share";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Favourites = ({ recipe }) => {
  const { id } = recipe;
  const { label, image, url, source, ingredientName } = recipe.fields;
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  function calendarDate(date) {
    const res = axios.put("http://localhost:3001/recipes", {
      id: recipe.id,
      fields: { date },
    });
    setStartDate(date);
  }

  async function removeFavourite() {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keyR00qDFV6vvxMq2" }).base(
      "appd8eN5Q77OzFlvy"
    );
    base("recipes").destroy(id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted record", deletedRecord.id);
    });
  }
  return (
    <div className="recipe">
      <CardDeck>
        <Card className="text-center">
          <Card.Header>
            <h2>{label}</h2>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={image} alt={label} style={{maxWidth: 332}} />
            <br />
            <Button variant="primary" onClick={() => setShow(!show)}>
              Ingredients
            </Button>
            <Container>
            {show && ingredientName}
           </Container>
            <FacebookShareButton
              url={url}
              quote={label}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => calendarDate(date)}
            />
            <br/>
            <Button onClick={() => removeFavourite()}>
              Remove from favourites
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            <a href={url} target="_blank">
              Recipe from {source}
            </a>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
};

export default Favourites;
