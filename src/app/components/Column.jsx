import React, { useState } from 'react';
import StrictModeDroppable from './StrictModeDroppable';
import DraggableTask from './DraggableTask';
import ComponentSelector from './ComponentSelector';

const Column = ({ droppableId, tasks, type, addTask, removeTask, removeColumn, editTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleAddTask = (component) => {
        if (taskToEdit) {
            editTask(droppableId, taskToEdit.id, component);
            setTaskToEdit(null);
        } else {
            addTask(droppableId, component);
        }
        setIsModalOpen(false);
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const style = {
        backgroundColor: "orange",
        height: "300px",
        width: "400px",
        margin: "100px",
        padding: "16px",
        border: "1px solid lightgrey",
        borderRadius: "4px",
    };

    return (
        <div>
            <StrictModeDroppable droppableId={droppableId} type={type}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={style}>
                        <h2>{droppableId}</h2>
                        <button onClick={() => removeColumn(droppableId)} style={{ marginLeft: '10px', padding: '4px 8px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>Borrar Seccion</button>
                        {tasks.map((task, index) => (
                            <DraggableTask
                                key={task.id}
                                task={task}
                                index={index}
                                removeTask={() => removeTask(droppableId, task.id)}
                                openEditModal={() => openEditModal(task)}
                            />
                        ))}
                        {provided.placeholder}
                        <button onClick={() => setIsModalOpen(true)}>Agregar bloque</button>
                    </div>
                )}
            </StrictModeDroppable>
            <ComponentSelector
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setTaskToEdit(null);
                }}
                onSave={handleAddTask}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default Column;
