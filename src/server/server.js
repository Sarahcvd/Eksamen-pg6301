const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const wsServer = require("./websocket");
const userApi = require("./apiRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(
  session({
    secret: "32bJS7s5k5al",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "sarah" && password === "123456") {
      done(null, { username, is_admin: true });
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/profile", (req, res) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.send(401);
  }
  return res.json({
    username: "The master user",
  });
  /*
  PASSPORT
  if (!req.user) {
    return res.status(401).send();
  }
  const { username } = req.user;
  res.json({ username });*/
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.end();
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
