const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    paymentStatus: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
