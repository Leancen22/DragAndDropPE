// helper_functions.js
const reorder = (source, destination, taskDataArr) => {
    const taskData = [...taskDataArr];
  
    // Encontrar el índice del grupo de origen
    const sourceGroupIndex = taskData.findIndex(val => val.groupName === source.droppableId);
    const destinationGroupIndex = taskData.findIndex(val => val.groupName === destination.droppableId);
  
    // Copiar las tareas del grupo de origen
    const sourceTasks = Array.from(taskData[sourceGroupIndex].tasks);
  
    // Caso: mover dentro del mismo grupo
    if (source.droppableId === destination.droppableId) {
      const [movedTask] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, movedTask);
      taskData[sourceGroupIndex].tasks = sourceTasks;
    } else {
      // Caso: mover a otro grupo
      const destinationTasks = Array.from(taskData[destinationGroupIndex].tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);
      taskData[sourceGroupIndex].tasks = sourceTasks;
      taskData[destinationGroupIndex].tasks = destinationTasks;
    }
  
    return taskData;
  };
  
  export default {
    reorder,
  };
  