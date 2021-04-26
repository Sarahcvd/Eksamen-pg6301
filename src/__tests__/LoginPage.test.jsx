import * as React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { LoginPage } from "../client/LoginPage";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("login page", () => {
  xit("can log in", async () => {
    const identityProvider = jest.fn();
    const container = await renderForTest(
      <LoginPage userApi={{ identityProvider }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "test" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(loginUser).toBeCalledWith({ username: "test", password: "" });
  });
});
