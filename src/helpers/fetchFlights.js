import axios from "axios";
import moment from "moment";

const BUSINESS_URL = `https://tokigames-challenge.herokuapp.com/api/flights/business`;
const ECONOMY_URL = `https://tokigames-challenge.herokuapp.com/api/flights/cheap`;

let businessList = [];
let economyList = [];
let flightList = [];
const dateFormat = "DD MMMM YYYY, hh:mm";

const manipulateBusinessList = data => {
  console.log("businessList:");

  businessList = data.map((item, index) => {
    let myDate = new Date(item.departureTime * 1000);
    let newDepartureTime = moment(myDate.toGMTString()).format(dateFormat);
    let myDate2 = new Date(item.arrivalTime * 1000);
    let newArrivalTime = moment(myDate2.toGMTString()).format(dateFormat);

    return {
      class: "business",
      departure: item.departure,
      arrival: item.arrival,
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime
    };
  });
  console.log(businessList);
};

const manipulateEconomyList = data => {
  console.log("economyList:");

  economyList = data.map((item, index) => {
    let myDate = new Date(item.departure * 1000);
    let newDepartureTime = moment(myDate.toGMTString()).format(dateFormat);
    let myDate2 = new Date(item.arrival * 1000);
    let newArrivalTime = moment(myDate2.toGMTString()).format(dateFormat);
    let routeArray = item.route.split("-", 2);
    let departure = routeArray[0];
    let arrival = routeArray[1];
    return {
      class: "economy",
      departure: departure,
      arrival: arrival,
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime
    };
  });
  console.log(economyList);
};

const fetchFlights = async page => {
  const businessResponse = await axios.get(BUSINESS_URL);

  if (businessResponse.status >= 400) {
    throw new Error(businessResponse.errors);
  }
  console.log("fetching.....");
  manipulateBusinessList(businessResponse.data.data);
  const economyResponse = await axios.get(ECONOMY_URL);
  if (economyResponse.status >= 400) {
    throw new Error(economyResponse.errors);
  }
  manipulateEconomyList(economyResponse.data.data);

  flightList = businessList.concat(economyList);
  console.log("flightList");
  console.log(flightList);

  return flightList;
};

export { fetchFlights };
