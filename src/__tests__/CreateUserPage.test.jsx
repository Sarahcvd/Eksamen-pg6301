import * as React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { CreateUserPage } from "../client/CreateUserPage";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("create user page", () => {
  it("can create a new user", async () => {
    const createUser = jest.fn();
    const container = await renderForTest(
      <CreateUserPage userApi={{ createUser }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "test" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(createUser).toBeCalledWith({
      firstName: "test",
      lastName: "",
    });
  });
});
