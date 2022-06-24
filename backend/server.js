"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .get("/flights", getFlights)
  .get("/flights/:flightNumber", getFlight)
  .get("/reservations", getReservations)
  .get("/reservations/:identifier", getSingleReservation)
  .post("/reservations", addReservation)
  .delete("/reservations/:identifier", deleteReservation)
  .put("/reservations", updateReservation)
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
