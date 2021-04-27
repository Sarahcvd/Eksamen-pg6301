import * as React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
      await fetchJson(`http://localhost:3000/api/users/${id}`, {
        headers: {
          ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        },
      }),
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
    loadProfile: async () =>
      await fetchJson("http://localhost:3000/api/profile", {
        headers: {
          ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        },
      }),
  };

  const [access_token, setAccess_token] = useState();

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "916384078084-0vdudp3eluljf617umqmtoeuu870iru0.apps.googleusercontent.com",
  };

  return (
    <>
      <nav>
        <Link to={"/home"}>Back to home </Link>
      </nav>
      <main>
        <Switch>
          <Route path={"/profile"}>
            <ProfilePage userApi={userApi} />
          </Route>
          <Route path={"/create"}>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <CreateUserPage userApi={userApi} />
            )}
          </Route>
          <Route path={"/userInfo"}>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <UserInfo userApi={userApi} />
            )}
          </Route>
          <Route path={"/chat"}>
            {!access_token ? <Redirect to={"/"} /> : <ChatPage />}
          </Route>
          <Route exact path={"/"}>
            <LoginPage identityProvider={googleIdentityProvider} />
          </Route>
          <Route path={"/login/callback"}>
            <LoginCallbackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>
          <Route path={"/users/:id/edit"}>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <EditUserPage userApi={userApi} />
            )}
          </Route>
          <Route path={"/home"}>
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
