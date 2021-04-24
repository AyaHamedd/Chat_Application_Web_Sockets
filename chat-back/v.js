const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const messages = [];
let count = 0;
app.post("/messages", (req, res) => {
  messages.push(req.body);
  console.log("New msg:",req.body)
  res.status(204).end();
});

app.get("/messages", (req, res) => {
  res.json(messages.filter((msg)=>msg.time > req.query.time));
});

app.listen(3001, (err) => {
  if (err) return console.log(err);
  console.log("Started server on port 3001");
});
