import mongoose from "mongoose";

const identifierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lastIdentifier: { type: Number, required: true }
});

const Identifier = mongoose.model('Identifier', identifierSchema);
export default Identifier
