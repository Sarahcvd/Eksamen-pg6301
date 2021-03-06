import * as React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useLoading } from "./lib/useLoading";
import { ErrorView } from "./Components/ErrorView";
import { LoadingView } from "./Components/LoadingView";
import { InputField } from "./Components/InputField";

function EditUserForm({ onSubmit, user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  async function submit(e) {
    e.preventDefault();
    await onSubmit(e, { firstName, lastName, email });
  }

  return (
    <form onSubmit={submit} className={"user-container"}>
      <h1>Edit user: {firstName}</h1>
      <InputField
        label={"First Name"}
        value={firstName}
        onChangeValue={setFirstName}
      />
      <br />
      <InputField
        label={"Last Name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <br />
      <InputField label={"Email"} value={email} onChangeValue={setEmail} />
      <br />
      <button>Submit</button>
    </form>
  );
}

export function EditUserPage({ userApi }) {
  const { id } = useParams();
  const history = useHistory();

  const { data: user, error, loading, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  async function handleSubmit(e, { firstName, lastName, email }) {
    e.preventDefault();
    await userApi.updateUser(id, { firstName, lastName, email });
    history.push("/home");
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }

  return <EditUserForm onSubmit={handleSubmit} user={user} />;
}
