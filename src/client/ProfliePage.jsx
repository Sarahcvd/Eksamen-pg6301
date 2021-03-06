import * as React from "react";
import { useLoading } from "./lib/useLoading";
import { ErrorView } from "./Components/ErrorView";
import { LoadingView } from "./Components/LoadingView";

export function ProfilePage({ userApi }) {
  const { data, error, loading, reload } = useLoading(
    async () => await userApi.loadProfile()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !data) {
    return <LoadingView />;
  }

  return (
    <div className={"profile-container"}>
      <h1>Your profile</h1>
      <div>Name: {data.name}</div>
      <div>Email: {data.email}</div>
    </div>
  );
}
