//import mongoose
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

const kpiSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
})

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  xpPoints: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'inProgress', 'completed', 'cancelled', 'expired'],
    default: 'inProgress',
    required: true,
  },
  taskOwner: {
    type: String,
    required: true,
  },
  resources: [fileSchema],
  deliverables: [fileSchema],
  kpis: [kpiSchema],
  reportingSection: [kpiSchema], //
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
})

module.exports = mongoose.model('Task', taskSchema)

// const Task = mongoose.model('Task', taskSchema)
