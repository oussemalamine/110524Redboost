const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  xpPoints: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "completed"],
    default: "todo",
    required: true,
  },
  workers: {
    type: String,
  },
});

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventLink: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expertName: {
    type: String,
    required: true,
  },
  sectionTitle: {
    type: String,
    required: true,
  },
  startingHour: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  speakers: {
    type: String,
  },
  tasks: [taskSchema],
});

const EventModal = mongoose.model("Events", eventSchema);
module.exports = EventModal;
