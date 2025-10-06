import mongoose from "mongoose";

const flightCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g., Air India
  category: { type: String, required: true },     // e.g., Economy, Business, Premium
  country: { type: String },                      // Optional: country of airline
  code: { type: String }                          // Optional: airline code
});

export default mongoose.model("FlightCompany", flightCompanySchema);
