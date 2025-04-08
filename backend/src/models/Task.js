const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  status: {
    type: String,
    enum: ['ongoing', 'success', 'failure'],
    default: 'ongoing'
  }
}, { 
  timestamps: true
});

// Virtual field for time remaining (in milliseconds)
taskSchema.virtual('timeRemaining').get(function() {
  if (this.status !== 'ongoing') return 0;
  
  const now = new Date();
  return Math.max(0, this.deadline - now);
});

// Method to check if task is past deadline
taskSchema.methods.isPastDeadline = function() {
  return new Date() > this.deadline;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;