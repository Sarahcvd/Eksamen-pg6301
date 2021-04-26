import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application";
import { fetchJson, postJson } from "./lib/http";
import { BrowserRouter } from "react-router-dom";

const userApi = {
  listUsers: async () => await fetchJson("http://localhost:3000/api/users"),
  getUser: async (id) =>
    await fetchJson(`http://localhost:3000/api/users/${id}`),
  createUser: async ({ firstName, lastName, email }) => {
    return postJson("http://localhost:3000/api/users", {
      method: "POST",
      json: { firstName, lastName, email },
    });
  },
  updateUser: async (id, { firstName, lastName, email }) =>
    await postJson(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      json: { firstName, lastName, email },
    }),
  loginUser: async ({ username, password }) =>
    await postJson("http://localhost:3000/api/login", {
      method: "POST",
      json: { username, password },
    }),
  showProfile: async () => await fetchJson("http://localhost:3000/api/profile"),
};

ReactDOM.render(
  <BrowserRouter>
    <Application userApi={userApi} />
  </BrowserRouter>,
  document.getElementById("root")
);
