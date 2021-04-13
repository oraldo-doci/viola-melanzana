const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fetch = require("node-fetch");
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyR00qDFV6vvxMq2" }).base(
  "appd8eN5Q77OzFlvy"
);
const recipesTable = base("recipes");

app.get("/recipes", async (req, res) => {
  fetch(
    `https://api.airtable.com/v0/appd8eN5Q77OzFlvy/recipes?view=Grid%20view`,
    {
      headers: { Authorization: `Bearer keyR00qDFV6vvxMq2` }, // API key
    }
  )
    .then((res) => res.json())
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/recipes", async (req, res) => {
  const datain = req.body;
  console.log(req.body);
  recipesTable.create(datain, { typecast: true }, function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
});

app.put("/recipes", async (req, res) => {
  const datain = [
    {
      id: req.body.id,
      fields: { date: req.body.fields.date },
    },
  ];
  console.log(datain);
  recipesTable.update(datain, { typecast: true }, function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
});

app.all((req, res) => {
  res.json({ error: "C'è un disturbo nella forza" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
