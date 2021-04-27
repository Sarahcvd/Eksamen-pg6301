import { Link } from "react-router-dom";
import * as React from "react";

export function HomePage() {
  return (
    <div id={"home-page-container"}>
      <h1>Welcome to this awesome application</h1>
      <li className={"list-items"}>
        <Link to={"/profile"}>Profile Page</Link>
      </li>
      <h4>User Info</h4>
      <li className={"list-items"}>
        <Link to={"/create"}>Add a New User</Link>
      </li>
      <li className={"list-items"}>
        <Link to={"/userInfo"}>See All Users</Link>
      </li>
      <h4>Chat</h4>
      <li className={"list-items"}>
        <Link to={"/chat"}>Chat</Link>
      </li>
    </div>
  );
}
