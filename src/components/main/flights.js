import React, { useState, useEffect } from "react";
import "./main.scss";
import {
  Modal,
  Select,
  Input,
  Radio,
  DatePicker,
  notification,
  Icon
} from "antd";
import { Table, Divider } from "antd";
//import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { fetchFlightsAction, createFlightAction } from "../../redux/actions";
import _ from "lodash";
import FlightModal from "./createFlightModal";
import moment from "moment";

const { Option } = Select;

//Columns for the flights table.
const columns = [
  {
    title: "Departure",
    dataIndex: "departure",
    key: "departure",
    sorter: (a, b) => {
      return a.departure.localeCompare(b.departure);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Departure Time",
    dataIndex: "departureTime",
    key: "departureTime"
  },
  {
    title: "Arrival",
    dataIndex: "arrival",
    key: "arrival",
    sorter: (a, b) => {
      return a.arrival.localeCompare(b.arrival);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Arrival Time",
    dataIndex: "arrivalTime",
    key: "arrivalTime"
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
    sorter: (a, b) => {
      return a.class.localeCompare(b.class);
    },
    sortDirections: ["descend", "ascend"]
  },

  {
    title: "",
    key: "action",
    render: (text, record) => (
      <span>
        <Divider type="vertical" />
        <a href="javascript:;">Buy</a>
      </span>
    )
  }
];

// Main function of the component.
function Flights(props) {
  const [flightModalVisible, setFlightModalVisible] = useState(false);
  const [allData, setAllData] = useState(props.flights);
  const [dataInit, setDataInit] = useState(0);

  const [filterOpts, setfilterOpts] = useState({
    departureFilter: "All",
    arrivalFilter: "All",
    classFilter: "All"
  });

  useEffect(() => {
    props.fetchFlights();
  }, []);

  const showFlightModal = () => {
    setFlightModalVisible(true);
  };

  const hideFlightModal = () => {
    setFlightModalVisible(false);
    setDataInit(1);
  };

  console.log("flight props");
  console.log(props);
  let tableData = props.flights;

  let departureList =
    props.flights && _.uniq(props.flights.map(item => item.departure));
  let arrivalList =
    props.flights && _.uniq(props.flights.map(item => item.arrival));
  departureList = _.sortBy(departureList);
  arrivalList = _.sortBy(arrivalList);

  const onDepartureChange = value => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      departureFilter: value
    }));
    tableData = props.flights.filter(
      item =>
        (value == "All" ? true : item.departure === value) &&
        (filterOpts.arrivalFilter === "All"
          ? true
          : item.arrival === filterOpts.arrivalFilter) &&
        (filterOpts.classFilter === "All"
          ? true
          : item.class === filterOpts.classFilter)
    );
    setAllData(tableData);
  };

  const onArrivalChange = value => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      arrivalFilter: value
    }));
    tableData = props.flights.filter(
      item =>
        (value === "All" ? true : item.arrival === value) &&
        (filterOpts.departureFilter === "All"
          ? true
          : item.departure === filterOpts.departureFilter) &&
        (filterOpts.classFilter === "All"
          ? true
          : item.class === filterOpts.classFilter)
    );
    setAllData(tableData);
  };

  const onClassChange = value => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      classFilter: value
    }));
    tableData = props.flights.filter(
      item =>
        (value === "All" ? true : item.class === value) &&
        (filterOpts.departureFilter === "All"
          ? true
          : item.departure === filterOpts.departureFilter) &&
        (filterOpts.arrivalFilter === "All"
          ? true
          : item.arrival === filterOpts.arrivalFilter)
    );
    setAllData(tableData);
  };

  if (dataInit === 0 && props.loading) setDataInit(dataInit + 1);
  if (dataInit === 1 && !props.loading) {
    setDataInit(dataInit + 1);
    tableData = _.sortBy(props.flights, field => field.departure);
    setAllData(tableData);
  }

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
          <div className="main-labels"> Depart From: </div>
          <Select
            id="departureSelect"
            defaultValue="All"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Departure"
            optionFilterProp="children"
            onChange={onDepartureChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="All">All</Option>
            {departureList &&
              departureList.map((item, index) => (
                <Option key={item}>{item}</Option>
              ))}
          </Select>
        </div>

        <div className="arrivalSelect">
          <div className="main-labels"> Arrive to: </div>
          <Select
            id="arrivalSelect"
            className="select-group"
            defaultValue="All"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Arrival"
            selected={0}
            optionFilterProp="children"
            onChange={onArrivalChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="All">All</Option>

            {arrivalList &&
              arrivalList.map((item, index) => (
                <Option key={item}>{item}</Option>
              ))}
          </Select>
        </div>

        <div className="classSelect">
          <div className="main-labels"> Class: </div>

          <Select
            id="classSelect"
            defaultValue="All"
            showSearch
            style={{ width: 200 }}
            placeholder="Select class"
            optionFilterProp="children"
            onChange={onClassChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="All">All</Option>
            <Option value="Business">Business</Option>
            <Option value="Economy">Economy</Option>
          </Select>
        </div>

        <Table
          scroll={{ x: "auto" }}
          columns={columns}
          dataSource={allData}
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
