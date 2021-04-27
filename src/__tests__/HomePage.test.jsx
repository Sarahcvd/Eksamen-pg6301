import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import * as React from "react";
import { HomePage } from "../client/HomePage";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("home page", () => {
  it("can show home page", async () => {
    const container = await renderForTest(<HomePage />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Welcome to this awesome application"
    );
  });
});
