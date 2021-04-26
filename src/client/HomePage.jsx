import { Link } from "react-router-dom";
import * as React from "react";

export function HomePage() {
  return (
    <div id={"home-page-container"}>
      <h1>Welcome to this awesome application</h1>
      <h4>Login</h4>
      <li>
        <Link to={"/profile"}>Profile Page</Link>
      </li>
      <h4>User Info</h4>
      <li>
        <Link to={"/create"}>Add a New User</Link>
      </li>
      <li>
        <Link to={"/userInfo"}>See User Info Page</Link>
      </li>
      <h4>Chat</h4>
      <li>
        <Link to={"/chat"}>Chat</Link>
      </li>
    </div>
  );
}
