import * as React from "react";
import { useLoading } from "./lib/useLoading";
import { ErrorView } from "./Components/ErrorView";
import { LoadingView } from "./Components/LoadingView";
import { useEffect, useState } from "react";
import { fetchJsonForProfile } from "./lib/http";

export function ProfilePage({ userApi }) {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  const { data, error, loading, reload } = useLoading(
    async () => await userApi.showProfile()
  );

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJsonForProfile(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const query = new URLSearchParams({
      response_type: "token",
      scope: "openid profile email",
      client_id:
        "916384078084-0vdudp3eluljf617umqmtoeuu870iru0.apps.googleusercontent.com",
      redirect_uri: window.location.origin + "/oauth2callback",
    });
    setAuthorizationUrl(authorization_endpoint + "?" + query);
  }, []);

  if (error) {
    if (error.status === 401) {
      return (
        <div>
          <a href={authorizationUrl} target={"_self"}>
            <button>Log in</button>
          </a>
        </div>
      );
    }
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;

  return (
    <div>
      <h1>Your profile</h1>
      <div>Username: {username}</div>
    </div>
  );
}
