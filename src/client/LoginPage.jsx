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
    <div>
      <h1>Log in</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

/*export function LoginPage({ userApi }) {
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
}*/
