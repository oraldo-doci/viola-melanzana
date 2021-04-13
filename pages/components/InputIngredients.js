import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

function InputIngredients() {
  function fetchIngredients(data) {
    axios
      .get("http://localhost:3001/ingredients")
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        setIngredient(res.data.records.map((r) => r.fields));
        ingredient.filter((f) =>
          f.ingredient_name.toLowerCase().includes(data)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const [ingredient, setIngredient] = useState([]);
  return (
    <div>
      <Fragment>
        <form>
          <input
            id="searchBar-ingredients"
            type="text"
            onChange={(event) => fetchIngredients(event)}
            placeholder="CHOOSE YOUR INGREDIENTS"
          ></input>
          <button className="button-ingredients">SEARCH</button>
        </form>
      </Fragment>
    </div>
  );
}

export default InputIngredients;
