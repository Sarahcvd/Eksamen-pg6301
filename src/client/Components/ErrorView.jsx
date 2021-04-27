import * as React from "react";

export function ErrorView({ error }) {
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
    </>
  );
}
