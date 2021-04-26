import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { UserInfo } from "../client/UserInfo";

const userApi = {
  listUsers: async () => [{ id: 1, firstName: "Sarah", lastName: "van Dijk" }],
};

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("list user page", () => {
  it("shows users on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <UserInfo userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual("Sarah van Dijk");
  });

  it("can show error message", async () => {
    const listUsers = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(<UserInfo userApi={{ listUsers }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });
});
