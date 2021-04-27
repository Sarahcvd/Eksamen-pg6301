import * as React from "react";
import { LoadingView } from "./Components/LoadingView";
import { ErrorView } from "./Components/ErrorView";
import { useLoading } from "./lib/useLoading";
import { Link } from "react-router-dom";

export function UserInfo({ userApi }) {
  const { data: users, error, loading, reload } = useLoading(
    async () => await userApi.listUsers()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !users) {
    return <LoadingView />;
  }
  return (
    <div className={"user-container"}>
      <h1>Registered users</h1>
      <p>(You can click on a user to edit it)</p>
      {users.map(({ id, firstName, lastName, email }) => (
        <li key={id}>
          <Link to={`/users/${id}/edit`}>
            {firstName + " " + lastName + " " + email}
          </Link>
        </li>
      ))}
    </div>
  );
}
