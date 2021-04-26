import React, { useState } from "react";
import { ChatView } from "./ChatView";

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
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
