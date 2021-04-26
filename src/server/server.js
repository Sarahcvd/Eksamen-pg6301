const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const wsServer = require("./websocket");
const userApi = require("./apiRouter");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.get("/api/profile", async (req, res) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.sendStatus(401);
  }

  const { userinfo_endpoint } = await fetchJson(discoveryURL);
  const userinfo = await fetchJson(userinfo_endpoint, {
    headers: {
      Authorization,
    },
  });

  return res.json(userinfo);
});

app.use(cors());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use("/api/users", userApi);

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const server = app.listen(3000, () => {
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
  console.log("Server started on http://localhost:3000");
});
