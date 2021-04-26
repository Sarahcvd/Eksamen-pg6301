import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { LoadingView } from "../client/Components/LoadingView";

describe("loading view", () => {
  it("shows loading view on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<LoadingView />, container);
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
