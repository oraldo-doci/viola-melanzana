import React from "react";
import { v4 as uuidv4 } from "uuid";

const Ingredients = ({ ingredients }) => {
  return ingredients.map((ingredient) => {
    return (
      <ul key={uuidv4()} className="ingredient-list">
        <li className="ingredient-text">{ingredient.text} - {ingredient.weight.toFixed(2)}gr</li>
      </ul>
    );
  });
};

export default Ingredients;
