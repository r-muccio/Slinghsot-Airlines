const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { MONGO_URI } = process.env;
const { resourceLimits } = require("worker_threads");

const { flights, reservations } = require("./data");

let flightSA231 = flights.SA231.map((el) => {
  el._id = el.id;
  delete el.id;
  return el;
});

let correctedReservations = reservations.map((el) => {
  el._id = el.id;
  delete el.id;
  return el;
});

let flightlist = Object.keys(flights);
let flightList = [];
flightlist.forEach((el, index) => {
  let elemento = { _id: index, flight: el };
  flightList.push(elemento);
});

async function pushFlight(req, res) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection("SA231").insertMany(flightSA231);
    console.log({ result });
    client.close();
    if (result.acknowledged === true && result.insertedCount > 0) {
      console.log("success!");
    } else {
      console.log("uh oh. something isn't right...");
      console.log(result);
      throw new Error("AAAAHHHHHH!!!!!");
    }
  } catch (err) {
    console.log(err.stack);
  }
}

async function pushReservations(req, res) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db
      .collection("reservations")
      .insertMany(correctedReservations);
    console.log("result: ", result);
    client.close();
    if (result.acknowledged === true && result.insertedCount == 1) {
      console.log("success!");
    } else {
      console.log("uh oh. something isn't right...");
      console.log(result);
      throw new Error("AAAAHHHHHH!!!!!");
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

async function pushFlightList(req, res) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection("FlightList").insertMany(flightList);
    console.log({ result });
    client.close();
    if (result.acknowledged === true && result.insertedCount > 0) {
      console.log("success!");
    } else {
      console.log("uh oh. something isn't right...");
      console.log(result);
      throw new Error("AAAAHHHHHH!!!!!");
    }
  } catch (err) {
    console.log(err.stack);
  }
}

pushFlight();
// pushReservations();
// pushFlightList();
