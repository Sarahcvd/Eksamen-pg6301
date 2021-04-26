import * as React from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ChatPage } from "./ChatPage";
import { LoginPage } from "./LoginPage";
import { EditUserPage } from "./EditUserPage";
import { CreateUserPage } from "./CreateUserPage";
import { HomePage } from "./HomePage";
import { UserInfo } from "./UserInfo";
import { ProfilePage } from "./ProfliePage";

export function Application({ userApi }) {
  return (
    <>
      <nav>
        <Link to={"/"}>Back to home </Link>
      </nav>
      <main>
        <Switch>
          <Route path={"/profile"}>
            <ProfilePage userApi={userApi} />
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
          <Route path={"/login"}>
            <LoginPage userApi={userApi} />
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
