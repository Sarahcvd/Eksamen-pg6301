import React from "react";

export function ErrorView({ error }) {
  if (error.status === 401) {
    return (
      <div>
        You are not logged in{" "}
        <a href={"/api/login"} target={"_self"}>
          <button>Log in</button>
        </a>
      </div>
    );
  }
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
    </>
  );
}
