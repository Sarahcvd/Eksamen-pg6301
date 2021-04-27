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
    <form onSubmit={handleSubmit}>
      {submitting && <div>Please wait</div>}
      {error && <div>Error: {error.toString()}</div>}
      <h1>Add a new user</h1>
      <InputField
        value={firstName}
        label={"First name"}
        onChangeValue={setFirstName}
      />
      <InputField
        value={lastName}
        label={"Last Name"}
        onChangeValue={setLastName}
      />
      <InputField value={email} label={"Email"} onChangeValue={setEmail} />
      <button disabled={submitting}>Submit</button>
    </form>
  );
}
