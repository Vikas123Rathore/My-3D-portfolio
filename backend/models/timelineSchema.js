import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"], // e.g., "Matriculation"
  },
  description: {
    type: String,
    required: [true, "Description Required!"], // e.g., "From XYZ School"
  },
  timeline: {
    from: { type: String, required: [true, "Start Date Required!"] }, 
    to: { type: String }, // Agar chal raha hai to blank
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);