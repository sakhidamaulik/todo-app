import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import TaskListPanel from "./Components/TaskListPanel";

describe("App", () => {
  let wrapper: any;
  beforeEach(() => (wrapper = shallow(<App />)));

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a TaskListPanel component", () => {
    expect(wrapper.containsMatchingElement(<TaskListPanel />)).toEqual(true);
  });
});
