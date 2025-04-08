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
  },
  status: {
    type: String,
    enum: ['ongoing', 'success', 'failure'],
    default: 'ongoing'
  }
}, { 
  timestamps: true 
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;