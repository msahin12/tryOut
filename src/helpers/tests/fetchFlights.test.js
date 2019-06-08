import React from "react";
import { shallow } from "enzyme";

import {fetchFlights} from "../fetchFlights";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


describe("fetchFlights fn", () => {
  it("should fetch flights correctly", () => {
    const result = fetchFlights();
    expect(result).not.toBe(null);
  });
});

