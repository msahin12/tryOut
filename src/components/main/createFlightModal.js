import React, { useState } from "react";

import { Modal, Input, Radio, notification, DatePicker, Icon } from "antd";
import "antd/dist/antd.css";

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

const FlightModal = props => {
  const [newFlight, setNewFlight] = useState({
    class: "",
    arrival: "",
    departure: "",
    departureTime: null,
    arrivalTime: null
  });

  function onRadioChange(e) {
    setNewFlight(newFlight => ({
      ...newFlight,
      class: e.target.value === 0 ? "economy" : "business"
    }));
  }

  function onDatePicker1Change(value, dateString) {
    setNewFlight(newFlight => ({
      ...newFlight,
      departureTime: dateString
    }));
  }
  function onDatePicker2Change(value, dateString) {
    setNewFlight(newFlight => ({
      ...newFlight,
      arrivalTime: dateString
    }));
  }
  const departureInputBlur = e => {
    setNewFlight(newFlight => ({
      ...newFlight,
      departure: e.target.value
    }));
  };

  const arrivalInputBlur = e => {
    e.target.value &&
      setNewFlight(newFlight => ({
        ...newFlight,
        arrival: e.target.value
      }));
  };

  const handleModalOk = () => {
    props.handleClose();
    openNotification();
    props.createFlight([newFlight]);
  };

  return (
    <Modal
      title="Create A New Flight"
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
          />
        </div>{" "}
      </div>
    </Modal>
  );
};

export default FlightModal;
