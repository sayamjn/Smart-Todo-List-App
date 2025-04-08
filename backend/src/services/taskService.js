const Task = require('../models/Task');

exports.updateTaskStatuses = async () => {
  try {
    const now = new Date();
    
    const tasksToUpdate = await Task.find({
      status: 'ongoing',
      deadline: { $lt: now }
    });
    
    console.log(`Found ${tasksToUpdate.length} tasks to mark as failure`);
    
    if (tasksToUpdate.length > 0) {
      const updatePromises = tasksToUpdate.map(task => 
        Task.findByIdAndUpdate(
          task._id,
          { status: 'failure' },
          { new: true }
        )
      );
      
      await Promise.all(updatePromises);
      console.log('Successfully updated task statuses');
    }
    
    return { updated: tasksToUpdate.length };
  } catch (error) {
    console.error('Error updating task statuses:', error);
    throw error;
  }
};

exports.getTaskCounts = async () => {
  try {
    const counts = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const result = {
      ongoing: 0,
      success: 0,
      failure: 0
    };
    
    counts.forEach(item => {
      result[item._id] = item.count;
    });
    
    return result;
  } catch (error) {
    console.error('Error getting task counts:', error);
    throw error;
  }
};