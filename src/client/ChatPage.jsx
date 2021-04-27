import * as React from "react";
import { useState } from "react";
import { ChatView } from "./ChatView";
import { InputField } from "./Components/InputField";

export function ChatPage() {
  const [username, setUsername] = useState();
  if (!username) {
    return <ChatLoginPage onLogin={(username) => setUsername(username)} />;
  }

  return <ChatView username={username} />;
}

function ChatLoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
  }
  return (
    <div className={"chat-login"}>
      <h1>Please Enter Username</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Username"}
          value={username}
          onChangeValue={setUsername}
        />
        <br />
        <button>Start Chat</button>
      </form>
    </div>
  );
}
