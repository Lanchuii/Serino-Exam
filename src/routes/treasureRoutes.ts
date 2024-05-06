import express from "express";
import middleware from "../auth/middleware.js";
import getNearbyTreasure from "../utils/getNearbyTreasure.js";

export const treasureRoutes = express.Router();

treasureRoutes.post("/", middleware, (req, res) => {
  const { latitude, longitude, distance, prizeVal } = req.body;
  const S400 = res.status(400);

  try {
    // Validate required fields
    if (typeof latitude !== "number") return S400.send("Invalid latitude.");
    if (typeof longitude !== "number") return S400.send("Invalid longitude.");
    if (distance !== 1 && distance !== 10) return S400.send("Invalid distance. Must be 1 or 10.");

    // Validate optional fields
    if (typeof prizeVal !== "undefined") {
      if (typeof prizeVal !== "number") return S400.send("prizeVal must be a number.");
      if (prizeVal < 10 || prizeVal > 30) return S400.send("prizeVal must be in the range of 10-30.");
      if (prizeVal !== Math.round(prizeVal)) return S400.send("prizeVal must be a whole number.");
    };

    res.json(getNearbyTreasure(latitude, longitude, distance, prizeVal));
  } catch (e) {
    S400.send(e);
  }
});