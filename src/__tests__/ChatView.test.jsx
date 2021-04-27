import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import * as React from "react";
import { ChatView } from "../client/ChatView";
import { Simulate } from "react-dom/test-utils";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("chat view page", () => {
  it("can show existing chat messages", async () => {
    const chatLog = [
      {
        id: "1",
        username: "Johannes",
        message: "Hello",
      },
      {
        id: "2",
        username: "User 2",
        message: "Welcome, Johannes",
      },
    ];

    const container = await renderForTest(
      <ChatView chatPreview={chatLog} username={{ name: "Myself" }} />
    );

    expect(container.querySelector(".message").textContent).toEqual(
      "Johannes: Hello"
    );
    expect(container.querySelector("header h1").textContent).toEqual(
      "Chat page"
    );
    expect(container).toMatchSnapshot();
  });

  it("submits a new message", async () => {
    const container = await renderForTest(<ChatView chatPreview={[]} />);
    Simulate.change(container.querySelector("input"), {
      target: { value: "Hello World" },
    });
    expect(container.querySelector("input").getAttribute("value")).toEqual(
      "Hello World"
    );
    Simulate.submit(container.querySelector("form"));
    expect(container.querySelector("input").getAttribute("value")).toEqual("");
  });
});
