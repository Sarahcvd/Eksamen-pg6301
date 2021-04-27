import * as React from "react";
import { fetchJson } from "./lib/http";

export function LoginPage({ identityProvider }) {
  const { discoveryURL, client_id } = identityProvider;

  async function handleLogin() {
    const { authorization_endpoint } = await fetchJson(discoveryURL);
    const params = {
      client_id,
      response_type: "token",
      scope: "openid email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }
  return (
    <div className={"login-container"}>
      <h1>Log in with Google to continue</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
