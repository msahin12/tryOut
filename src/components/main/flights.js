import React, { useState, useEffect } from "react";
import "./main.scss";
import { Modal, Select, Input, Radio, notification, Icon } from "antd";
import { Table, Divider, Tag } from "antd";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { fetchFlightsAction, createFlightAction } from "../../redux/actions";
import _ from "lodash";

let tableData = [];
let newFlight = {};
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
    title: "Class",
    dataIndex: "class",
    key: "class"
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

function onOk(value) {
  console.log("onOk: ", value);
}

const FlightModal = props => {
  const [newFlight, setNewFlight] = useState({
    class: "",
    arrival: "",
    departure: "",
    departureTime: null,
    arrivalTime: null
  });

  function onRadioChange(e) {
    console.log("radio change");
    console.log(e.target.value);

    setNewFlight(newFlight => ({
      ...newFlight,
      class: e.target.value === 0 ? "economy" : "business"
    }));
  }

  function onDatePicker1Change(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);

    setNewFlight(newFlight => ({
      ...newFlight,
      departureTime: dateString
    }));
  }
  function onDatePicker2Change(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setNewFlight(newFlight => ({
      ...newFlight,
      arrivalTime: dateString
    }));
  }
  const departureInputBlur = e => {
    console.log("deptInputBlur");
    console.log(e.target.value);
    setNewFlight(newFlight => ({
      ...newFlight,
      departure: e.target.value
    }));
  };
  const arrivalInputBlur = e => {
    console.log("arInputBlur");
    console.log(e.target.value);
    setNewFlight(newFlight => ({
      ...newFlight,
      arrival: e.target.value
    }));
  };

  const handleModalOk = () => {
    props.handleClose();
    openNotification();
    console.log(newFlight);
    props.createFlight([newFlight]);
  };

  return (
    <Modal
      title="Add a flight"
      visible={props.flightModalVisible}
      onOk={handleModalOk}
      onCancel={props.handleClose}
    >
      <div className="modal-body">
        <div className="radio-buttons">
          <p>Class :</p>
          <Radio.Group id="modalRadioGroup" onChange={onRadioChange}>
            <Radio id="modalRadio1" value={0}>
              Economy
            </Radio>
            <Radio id="modalRadio2" value={1}>
              Business
            </Radio>
          </Radio.Group>
        </div>
        <div className="departure-input">
          <p>Departure </p>

          <Input
            id="departureInput"
            placeholder="From"
            allowClear
            onBlur={departureInputBlur}
          />
        </div>
        <div className="arrival-input">
          <p>Arrival </p>

          <Input
            id="arrivalInput"
            placeholder="To"
            allowClear
            onBlur={arrivalInputBlur}
          />
        </div>
        <div className="departure-datetime">
          <p>Departure Time </p>

          <DatePicker
            id="departureDatePicker"
            showTime={{ format: "HH:mm" }}
            format="DD MMMM YYYY, HH:mm"
            placeholder="Select Time"
            onChange={onDatePicker1Change}
            onOk={onOk}
          />
        </div>
        <div className="arrival-datetime">
          <p>Arrival Time </p>

          <DatePicker
            id="arrivalDatePicker"
            showTime={{ format: "HH:mm" }}
            format="DD MMMM YYYY, HH:mm"
            placeholder="Select Time"
            onChange={onDatePicker2Change}
            onOk={onOk}
          />
        </div>{" "}
      </div>
    </Modal>
  );
};

function Flights(props) {
  const [flightModalVisible, setFlightModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  useEffect(() => props.fetchFlights(), []);

  const showFlightModal = () => {
    setFlightModalVisible(true);
  };

  const hideFlightModal = () => {
    setFlightModalVisible(false);
  };

  console.log("flight props");
  console.log(props);

  const departureList =
    props.flight && _.uniq(props.flights.map(item => item.departure));
  const arrivalList =
    props.flight && _.uniq(props.flights.map(item => item.arrival));
  console.log("departureList");
  console.log(departureList);
  console.log("arrivalList");
  console.log(arrivalList);

  return (
    <div className="flights-section">
      <FlightModal
        flightModalVisible={flightModalVisible}
        handleClose={() => hideFlightModal()}
        createFlight={props.createFlight}
      />
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
            <Option key="all">All</Option>
            {departureList &&
              departureList.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
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
            <Option key="all">All</Option>

            {arrivalList &&
              arrivalList.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
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
            <Option key="all">All</Option>
            <Option value="economy">Economy</Option>
            <Option value="business">Business</Option>
          </Select>
        </div>

        <div className="search-button">
          <Button variant="contained" color="primary">
            Search
          </Button>
        </div>
        <Table
          scroll={{ x: "auto" }}
          columns={columns}
          dataSource={props.flights}
          loading={props.loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ flights, loading }) => {
  console.log("mapStateToProps içi flights");
  console.log(flights);
  return { flights, loading };
};

const mapDispatchToProps = dispatch => ({
  fetchFlights: () => dispatch(fetchFlightsAction()),
  createFlight: flight => dispatch(createFlightAction(flight))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flights);
