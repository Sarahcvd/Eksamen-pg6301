import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function AuthorizationCallback() {
  let history = useHistory();
  useEffect(() => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    localStorage.setItem("access_token", access_token);
    history.push("/home");
  }, []);
  return <div>Callback...</div>;
}
