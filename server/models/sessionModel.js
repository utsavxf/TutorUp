const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    teacherId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", schema);

module.exports = Session;
