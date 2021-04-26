import * as React from "react";
import { useState } from "react";
import { InputField } from "./Components/InputField";
import { useHistory } from "react-router";
import { useSubmit } from "./lib/useSubmit";

export function LoginPage({ userApi }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    async () => {
      await userApi.loginUser({ username, password });
    },
    () => history.push("/")
  );

  return (
    <div>
      <h1>Log in to continue</h1>
      <form onSubmit={handleSubmit}>
        {submitting && <div>Please wait</div>}
        {error && <div>Error: {error.toString()}</div>}
        <InputField
          value={username}
          label={"Username"}
          onChangeValue={setUsername}
        />
        <InputField
          value={password}
          type={"password"}
          label={"Password"}
          onChangeValue={setPassword}
        />
        <button disabled={submitting}>Log in</button>
      </form>
    </div>
  );
}
