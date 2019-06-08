/**
 * Summary.
 *
 * This helper, fetchFlight, gets the flights list asynchronously and manipulates it.
 *
 *
 */

import axios from "axios";
import moment from "moment";
import _ from "lodash";

const BUSINESS_URL = `https://tokigames-challenge.herokuapp.com/api/flights/business`;
const ECONOMY_URL = `https://tokigames-challenge.herokuapp.com/api/flights/cheap`;

let businessList = [];
let economyList = [];
let flightList = [];
const dateFormat = "DD MMMM YYYY, HH:mm";

const manipulateBusinessList = data => {
  businessList = data.map((item, index) => {
    let myDate = new Date(item.departureTime * 1000);
    let newDepartureTime = moment(myDate.toGMTString()).format(dateFormat);
    let myDate2 = new Date(item.arrivalTime * 1000);
    let newArrivalTime = moment(myDate2.toGMTString()).format(dateFormat);

    return {
      class: "Business",
      departure: item.departure,
      arrival: item.arrival,
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime
    };
  });
};

const manipulateEconomyList = data => {
  economyList = data.map((item, index) => {
    let myDate = new Date(item.departure * 1000);
    let newDepartureTime = moment(myDate.toGMTString()).format(dateFormat);
    let myDate2 = new Date(item.arrival * 1000);
    let newArrivalTime = moment(myDate2.toGMTString()).format(dateFormat);
    let routeArray = item.route.split("-", 2);
    let departure = routeArray[0];
    let arrival = routeArray[1];
    return {
      class: "Economy",
      departure: departure,
      arrival: arrival,
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime
    };
  });
};

const fetchFlights = async page => {
  const businessResponse = await axios.get(BUSINESS_URL);

  if (businessResponse.status >= 400) {
    throw new Error(businessResponse.errors);
  }
  manipulateBusinessList(businessResponse.data.data);
  const economyResponse = await axios.get(ECONOMY_URL);
  if (economyResponse.status >= 400) {
    throw new Error(economyResponse.errors);
  }
  manipulateEconomyList(economyResponse.data.data);

  let flightList2 = businessList.concat(economyList);
  flightList = _.sortBy(flightList2, o => o.departure);

  return flightList;
};

export { fetchFlights };
