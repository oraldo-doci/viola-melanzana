import React, { useState, useEffect } from "react";
import axios from "axios";

import Recipe from "./apiComponents/Recipe";
import { v4 as uuidv4 } from "uuid";
import {
  Dropdown,
  ButtonGroup,
  SplitButton,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function RecipesApi() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [projects, setProjects] = useState([]);

  const APP_ID = "cd031e0c";
  const APP_KEY = "530d7bfa70fdc10559f377c561636888";
  const url = `https://api.edamam.com/search?q=${query1}+${query2}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    const result = await axios.get(url);
    setRecipes(result.data.hits);
    setProjects(result.data.hits);
    setQuery1("");
    setQuery2("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange1 = (e) => {
    setQuery1(e.target.value);
  };
  const onChange2 = (e) => {
    setQuery2(e.target.value);
  };

  useEffect(() => {
    setProjects(recipes);
  }, []);

  useEffect(() => {
    setProjects([]);
    const filtered = recipes.filter((r) =>
      r.recipe.healthLabels.includes(filteredRecipes)
    );
    setProjects(filtered);
  }, [filteredRecipes]);

  return (
    <div className="api">
      <Container>
        <Form className="search-form" onSubmit={onSubmit}>
          <Row>
            <Col>
              <input
                type="text"
                placeholder="Choose your ingredient"
                autoComplete="off"
                onChange={onChange1}
                value={query1}
              />
              <input
                type="text"
                placeholder="Choose your ingredient"
                autoComplete="off"
                onChange={onChange2}
                value={query2}
              />
              <input type="submit" value="search" />
            </Col>
          </Row>
        </Form>
      </Container>

      <div id="filter-bar">
        <Dropdown as={ButtonGroup}>
          <SplitButton
            menuAlign={{ lg: "left" }}
            title="FILTER SEARCH"
            id="dropdown-split-basic"
          >
            <Dropdown.Item
              onClick={() => {
                setProjects(recipes);
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Alcohol-Free");
              }}
            >
              Alcohol free
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Peanut-Free");
              }}
            >
              Peanut free
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Sugar-Conscious");
              }}
            >
              Sugar conscious
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Tree-Nut-Free");
              }}
            >
              Tree nut free
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Vegan");
              }}
            >
              Vegan
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setFilteredRecipes("Vegetarian");
              }}
            >
              Vegetarian
            </Dropdown.Item>
          </SplitButton>
        </Dropdown>
      </div>
      <div className="recipes">
        {projects.map((recipe) => (
          <Recipe key={uuidv4()} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
