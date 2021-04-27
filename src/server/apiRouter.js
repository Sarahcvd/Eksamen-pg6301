const express = require("express");
const apiRouter = express.Router();

const userApi = [
  {
    id: 1,
    firstName: "guri",
    lastName: "malla",
    email: "guri@malla.no",
  },
  {
    id: 2,
    firstName: "Ole",
    lastName: "Brum",
    email: "ole@brum.no",
  },
  {
    id: 3,
    firstName: "Birger",
    lastName: "Hansen",
    email: "birger@hansen.no",
  },
];

apiRouter.get("", (req, res) => {
  res.json(userApi);
});

apiRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = userApi.find((u) => u.id === id);
  res.json(user);
});

apiRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = userApi.findIndex((u) => u.id === id);
  const { firstName, lastName, email } = req.body;
  userApi[userIndex] = { firstName, lastName, email, id };
  res.status(200).end();
});

apiRouter.post("", (req, res) => {
  const { firstName, lastName, email } = req.body;
  userApi.push({ firstName, lastName, email, id: userApi.length + 1 });
  res.status(201).end();
});

module.exports = apiRouter;
