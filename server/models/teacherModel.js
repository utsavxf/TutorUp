const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", schema);

module.exports = Teacher;
