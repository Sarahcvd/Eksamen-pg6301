import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import * as React from "react";
import { ProfilePage } from "../client/ProfliePage";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("profile page test", () => {
  it("can show information about logged in user", async () => {
    const loadProfile = () => ({
      name: "Johannes",
    });
    const container = await renderForTest(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Your profileName: JohannesEmail: "
    );
  });

  it("shows loading ", async () => {
    const loadProfile = jest.fn();
    const container = await renderForTest(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Loading...");
  });

  it("can show error message", async () => {
    const loadProfile = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(
      <ProfilePage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });
});
