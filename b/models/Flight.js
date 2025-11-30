const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },   // e.g. "Airstro"
    flightNo: { type: String, required: true },  // e.g. "AS 201"
    fromCode: { type: String, required: true },  // "DEL"
    toCode: { type: String, required: true },    // "BOM"
    date: { type: String, required: true },      // "2025-11-28" (YYYY-MM-DD)
    departTime: { type: String, required: true },// "17:00"
    arriveTime: { type: String, required: true },// "19:25"
    duration: { type: String, required: true },  // "02h 25m"
    nonStop: { type: Boolean, default: true },
    stops: { type: Number, default: 0 },

    economyPrice: { type: Number, required: true },
    businessPrice: { type: Number, required: true },

    seatsEconomy: { type: Number, default: 100 },
    seatsBusiness: { type: Number, default: 20 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
