import React, { useState } from "react";
import "./main.scss";
import { Modal, Select, Input, Radio, notification, Icon } from "antd";
import { Table, Divider, Tag } from "antd";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Departure",
    dataIndex: "departure",
    key: "departure"
  },
  {
    title: "Departure Time",
    dataIndex: "departureTime",
    key: "departureTime"
  },
  {
    title: "Arrival",
    dataIndex: "arrival",
    key: "arrival"
  },
  {
    title: "Arrival Time",
    dataIndex: "arrivalTime",
    key: "arrivalTime"
  },

  {
    title: "",
    key: "action",
    render: (text, record) => (
      <span>
        <Divider type="vertical" />
        <a href="javascript:;">Select</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    departure: "John Brown",
    departureTime: 32,
    arrival: "New York No. 1 Lake Park",
    arrivalTime: 32
  },
  {
    key: "2",
    departure: "Jim Green",
    departureTime: 42,
    arrival: "London No. 1 Lake Park",
    arrivalTime: 32
  },
  {
    key: "3",
    departure: "Joe Black",
    departureTime: 32,
    arrival: "Sidney No. 1 Lake Park",
    arrivalTime: 32
  }
];

const { Option } = Select;

const openNotification = () => {
  notification.config({
    placement: "bottomLeft"
  });
  notification.open({
    message: "Flight Created",
    description: "The flight is successfully created .",
    icon: <Icon type="check-circle" style={{ color: "#108ee9" }} />
  });
};

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function Flights() {
  const [flightModalVisible, setFlightModalVisible] = useState(false);
  const [flightModalRadio, setFlightModalRadio] = useState(1);

  const showFlightModal = () => {
    setFlightModalVisible(true);
  };

  const hideFlightModal = () => {
    setFlightModalVisible(false);
  };

  const handleOk = () => {
    setFlightModalVisible(false);
    openNotification();
  };

  const onRadioChange = e => {
    setFlightModalRadio(e.target.value);
  };

  const deptInputChange = () => {
    console.log("deptInputChange");
  };

  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  const FlightModal = () => (
    <Modal
      title="Add a flight"
      visible={flightModalVisible}
      onOk={handleOk}
      onCancel={hideFlightModal}
    >
      <div className="modal-body">
        <div className="radio-buttons">
          <p>Class :</p>
          <Radio.Group onChange={onRadioChange} value={flightModalRadio}>
            <Radio value={1}>Economy</Radio>
            <Radio value={2}>Business</Radio>
          </Radio.Group>
        </div>
        <div className="departure-input">
          <p>Departure </p>

          <Input placeholder="From" allowClear onChange={deptInputChange} />
        </div>
        <div className="arrival-input">
          <p>Arrival </p>

          <Input placeholder="To" allowClear onChange={deptInputChange} />
        </div>
        <div className="departure-datetime">
          <p>Departure Time </p>

          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder="Select Time"
            onChange={onChange}
            onOk={onOk}
          />
        </div>
        <div className="arrival-datetime">
          <p>Arrival Time </p>

          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            placeholder="Select Time"
            onChange={onChange}
            onOk={onOk}
          />
        </div>{" "}
      </div>
    </Modal>
  );

  return (
    <div className="flights-section">
      <FlightModal />
      <div className="flights-tab">
        <Avatar className="add-avatar" onClick={showFlightModal}>
          <AddIcon />
        </Avatar>
        <div className="departureSelect">
          <Select
            id="departureSelect"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Departure"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>

        <div className="arrivalSelect">
          <Select
            id="arrivalSelect"
            className="select-group"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Arrival"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>

        <div className="classSelect">
          <Select
            id="classSelect"
            showSearch
            style={{ width: 200 }}
            placeholder="Select class"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="economy">Economy</Option>
            <Option value="business">Business</Option>
          </Select>
        </div>

        <div className="search-button">
          <Button variant="contained" color="primary">
            Search
          </Button>
        </div>
        <Table scroll={{ x: "auto" }} columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Flights;
