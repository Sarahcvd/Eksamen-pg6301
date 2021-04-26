require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
const wsServer = require("./websocket");
const userApi = require("./apiRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
app.use(cors());

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "sarah" && password === "123456") {
      done(null, { username, is_admin: true });
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth2callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // HER SETTES OUTPUT, PRØV BILDE!!!
      done(null, {
        //username: profile.displayName,
        username: profile.emails[0].value,
      });
    }
  )
);

class HttpError extends Error {
  constructor(url, res) {
    super(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

function checkError(res, url) {
  if (!res.ok) {
    throw new HttpError(url, res);
  }
}

async function fetchJsonForProfile(url, options) {
  const res = await fetch(url, options);
  checkError(res, url);
  return await res.json();
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/profile", async (req, res) => {
  try {
    const authorization = req.header("Authorization");
    const { userinfo_endpoint } = await fetchJsonForProfile(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const userinfo = await fetchJsonForProfile(userinfo_endpoint, {
      method: "POST",
      headers: {
        Authorization: authorization,
      },
    });
    console.log(userinfo);
    res.json({ username: userinfo.name });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.end();
});

app.get(
  "/api/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/api/oauth2callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

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
