import React from "react";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Modal } from "antd";
import { Flights } from "../flights";

describe("<Flights />", () => {
  it("should render <Flights />", () => {
    const result = Flights;

    expect(result).not.toBe(null);
  });
});
