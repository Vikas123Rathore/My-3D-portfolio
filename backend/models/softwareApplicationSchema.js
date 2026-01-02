import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Required!"], // e.g., "Website Development" or "React"
  },
  svg: {
    public_id: { type: String, required: true },
    url: { type: String, required: true }, // Icon Image
  },
});

export const SoftwareApplication = mongoose.model("SoftwareApplication", softwareApplicationSchema);