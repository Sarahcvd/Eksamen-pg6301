import * as React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { EditUserPage } from "../client/EditUserPage";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("edit user page", () => {
  it("can show information about existing users", async () => {
    const getUser = () => ({
      firstName: "Peppa",
      lastName: "Gris",
      email: "peppa@gris.no"
    });
    const container = await renderForTest(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit a user (Peppa)"
    );
  });

  it("can show loading screen", async () => {
    const getUser = () => new Promise((resolve) => {});
    const container = await renderForTest(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Loading...");
  });

  it("can show error message", async () => {
    const getUser = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(
      <EditUserPage userApi={{ getUser }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });

  it("updates server on submit", async () => {
    const user = {
      firstName: "Erna",
      lastName: "Solberg",
      email: "erna@solberg.no"
    };
    const getUser = () => user;
    const updateUser = jest.fn();
    const container = await renderForTest(
      <EditUserPage userApi={{ getUser, updateUser }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "Jonas" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(updateUser).toBeCalledWith(undefined, {
      ...user,
      firstName: "Jonas",
    });
  });
});
