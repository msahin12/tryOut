import React from "react";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import { Modal } from "antd";
import FlightModal from "../createFlightModal";

describe("<FlightModal />", () => {
  it("should render modal", () => {
    const rendered = shallow(<FlightModal />);

    expect(rendered).toHaveLength(1);
  });

  
});
