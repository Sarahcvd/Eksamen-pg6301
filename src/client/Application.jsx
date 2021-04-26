import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ChatPage } from "./ChatPage";
import { LoginPage } from "./LoginPage";
import { EditUserPage } from "./EditUserPage";
import { CreateUserPage } from "./CreateUserPage";
import { HomePage } from "./HomePage";
import { UserInfo } from "./UserInfo";
import { ProfilePage } from "./ProfliePage";
import { fetchJson, postJson } from "./lib/http";
import { LoginCallbackPage } from "./LoginCallbackPage";

export function Application() {
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
  };

  const [access_token, setAccess_token] = useState();

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "916384078084-0vdudp3eluljf617umqmtoeuu870iru0.apps.googleusercontent.com",
  };

  function loadProfile() {
    return fetchJson("/api/profile", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  return (
    <>
      <nav>
        <Link to={"/"}>Back to home </Link>
      </nav>
      <main>
        <Switch>
          <Route path={"/profile"}>
            <ProfilePage loadProfile={loadProfile} />
          </Route>
          <Route path={"/create"}>
            <CreateUserPage userApi={userApi} />
          </Route>
          <Route path={"/userInfo"}>
            <UserInfo userApi={userApi} />
          </Route>
          <Route path={"/chat"}>
            <ChatPage />
          </Route>
          <Route exact path={"/login"}>
            <LoginPage identityProvider={googleIdentityProvider} />
          </Route>
          <Route path={"/login/callback"}>
            <LoginCallbackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>
          <Route path={"/users/:id/edit"}>
            <EditUserPage userApi={userApi} />
          </Route>
          <Route exact path={"/"}>
            <HomePage />
          </Route>
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}
