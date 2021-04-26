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
    <div>
      <h1>List users</h1>
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
