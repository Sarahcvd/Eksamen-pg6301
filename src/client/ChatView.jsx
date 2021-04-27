import * as React from "react";
import { useEffect, useState } from "react";

export function ChatView({ chatPreview, username }) {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = new useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const { message, id, username } = JSON.parse(event.data);
      setChatLog((chatLog) => {
        return [...chatLog, { message, id, username }];
      });
    };
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify({
          type: "login",
          username,
        })
      );
    };
    setWs(ws);
  }, []);

  function handleSubmitMessage(e) {
    e.preventDefault();
    if (ws.readyState !== 0) {
      ws.send(
        JSON.stringify({
          type: "message",
          message: message,
        })
      );
    }
    setMessage("");
  }

  const chatOutput = chatLog.length ? chatLog : chatPreview;
  return (
    <div id="chatContainer">
      <header>
        <h1>Chat page</h1>
      </header>
      <main id="chatLog">
        {chatOutput?.map(({ message, id, username }) => (
          <div className="message" key={id}>
            <strong>{username}: </strong>
            {message}
          </div>
        ))}
      </main>
      <footer>
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </div>
  );
}
