import * as React from "react";
import { useState } from "react";
import { InputField } from "./Components/InputField";
import { useHistory } from "react-router";
import { useSubmit } from "./lib/useSubmit";

export function CreateUserPage({ userApi }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    async () => {
      await userApi.createUser({ firstName, lastName, email });
    },
    () => history.push("/home")
  );

  return (
    <form onSubmit={handleSubmit} className={"user-container"}>
      {submitting && <div>Please wait</div>}
      {error && <div>Error: {error.toString()}</div>}
      <h1>Add a New User</h1>
      <InputField
        value={firstName}
        label={"First Name"}
        onChangeValue={setFirstName}
      />
      <br />
      <InputField
        value={lastName}
        label={"Last Name"}
        onChangeValue={setLastName}
      />
      <br />
      <InputField
        value={email}
        type={"email"}
        label={"Email"}
        onChangeValue={setEmail}
      />
      <br />
      <button disabled={submitting}>Add</button>
    </form>
  );
}
