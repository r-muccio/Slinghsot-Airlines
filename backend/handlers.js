"use strict";

const { Console } = require("console");
const { get } = require("http");
const { MongoClient, ConnectionClosedEvent } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const { flights, reservations } = require("./data");

const getFlights = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection("FlightList").find({}).toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, data: "Not Found" });
    }
    client.close();
    console.log("result: ", result);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getFlight = async (req, res) => {
  let flightNumber = req.params.flightNumber;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection(`${flightNumber}`).find().toArray();
    console.log({ result });
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, data: "Not Found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const addReservation = async (req, res) => {
  let reservation = req.body;
  console.log(reservation);
  let reservationId = `${reservation.flight}-${reservation.seat}-${Math.floor(
    Math.random() * 100000
  )}`;

  reservation._id = reservationId;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection("reservations").insertOne(reservation);
    const secondResult = await db.collection(`${reservation.flight}`).updateOne(
      {
        _id: `${reservation.seat}`,
      },
      {
        $set: {
          isAvailable: false,
        },
      }
    );
    client.close();
    res
      .status(200)
      .json({
        status: 200,
        message: "Reservation confirmed.",
        data: reservation,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db.collection("reservations").find().toArray();
    console.log({ result });
    client.close();
    if (result) {
      res.status(200).json({
        status: 200,
        message: "List of reservations.",
        data: result,
      });
    } else {
      throw new Error("Something went wrong.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      Error: err.message,
      message: "We were unable find the information you are looking for.",
    });
  }
};

const getSingleReservation = async (req, res) => {
  let targetReservation = req.params.identifier;
  console.log(targetReservation);

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");
    const result = await db
      .collection("reservations")
      .findOne({ _id: targetReservation });
    console.log({ result });
    client.close();
    if (result) {
      res.status(200).json({
        status: 200,
        message: "Reservation found.",
        data: result,
      });
    } else {
      throw new Error("There is no reservation under that ID.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      Error: err.message,
      message: "Please submit a valid reservation ID. They are case-sensitive.",
    });
  }
};

const deleteReservation = async (req, res) => {
  let targetReservation = req.params.identifier;
  console.log({ targetReservation });

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SlingAir");

    const secondResult = await db
      .collection("reservations")
      .findOne({ _id: targetReservation });
    console.log({ secondResult });
    const updateResult = await db
      .collection(`${secondResult.flight}`)
      .updateOne(
        { _id: secondResult.seat },
        {
          $set: {
            isAvailable: true,
          },
        }
      );
    console.log({ updateResult });

    const result = await db
      .collection("reservations")
      .deleteOne({ _id: targetReservation });
    console.log({ result });

    client.close();
    if (result.deletedCount == 1) {
      res.status(200).json({
        status: 200,
        message: "Reservation deleted",
        data: result,
      });
    } else {
      throw new Error(`deletedCount: ${result.deletedCount}`);
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: `Reservation by ID ${targetReservation} not found. No reservation deleted.`,
      message:
        "Please submit a valid reservation ID to delete reservation. They are case-sensitive.",
    });
  }
};

const updateReservation = async (req, res) => {
  let targetReservation = req.body;

  if (
    targetReservation._id &&
    targetReservation.flight &&
    targetReservation.seat &&
    targetReservation.givenName &&
    targetReservation.surname &&
    targetReservation.email
  ) {
    let updatedInfo = {
      _id: targetReservation._id,
      flight: targetReservation.flight,
      seat: targetReservation.seat,
      givenName: targetReservation.givenName,
      surname: targetReservation.surname,
      email: targetReservation.email,
    };

    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("SlingAir");
      const result = await db.collection("reservations").updateOne(
        {
          _id: `${targetReservation._id}`,
        },
        {
          $set: {
            _id: targetReservation._id,
            flight: targetReservation.flight,
            seat: targetReservation.seat,
            givenName: targetReservation.givenName,
            surname: targetReservation.surname,
            email: targetReservation.email,
          },
        }
      );
      client.close();
      if (result.matchedCount < 1) {
        throw new Error("Reservation not found.");
      } else if (result.modifiedCount < 1) {
        throw new Error("Reservation found but not modified.");
      } else {
        res.status(200).json({
          status: 200,
          message: "Reservation successfully modified.",
          newReservationData: updatedInfo,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 500,
        message: err.message,
        receivedData: targetReservation,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message:
        "Request body must be an object containing properties '_id', 'flight', 'seat', 'givenName', 'surname', and 'email'.",
      receivedData: targetReservation,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
