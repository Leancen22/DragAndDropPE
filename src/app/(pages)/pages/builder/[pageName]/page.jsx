'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '@/app/components/Column';
import helper from '@/app/utils/helper_functions';

const LayoutBuilder = () => {
    const { pageName } = useParams();
    const router = useRouter();
    const [taskList, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`/api/tasks/${pageName}`).then(response => {
            setTasks(response.data);
        });
    }, [pageName]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const updatedTasks = helper.reorder(result.source, result.destination, taskList);
        setTasks(updatedTasks);
    };

    const addColumn = () => {
        const newColumn = { 
            groupName: `Seccion-${taskList.length + 1}`, 
            tasks: [] 
        };
        setTasks([...taskList, newColumn]);
    };

    const addTask = (groupName, component) => {
        const newTaskList = taskList.map(column => {
            if (column.groupName === groupName) {
                const newTask = { 
                    id: `${groupName}-${column.tasks.length + 1}`, 
                    title: `Bloque ${column.tasks.length + 1}`, ...component 
                };
                return { ...column, tasks: [...column.tasks, newTask] };
            }
            return column;
        });
        setTasks(newTaskList);
    };

    const editTask = (groupName, taskId, updatedComponent) => {
        const newTaskList = taskList.map(column => {
            if (column.groupName === groupName) {
                const updatedTasks = column.tasks.map(task => task.id === taskId ? { ...task, ...updatedComponent } : task);
                return { ...column, tasks: updatedTasks };
            }
            return column;
        });
        setTasks(newTaskList);
    };

    const removeTask = (groupName, taskId) => {
        const newTaskList = taskList.map(column => {
            if (column.groupName === groupName) {
                const updatedTasks = column.tasks.filter(task => task.id !== taskId);
                return { ...column, tasks: updatedTasks };
            }
            return column;
        });
        setTasks(newTaskList);
    };

    const removeColumn = (groupName) => {
        const newTaskList = taskList.filter(column => column.groupName !== groupName);
        setTasks(newTaskList);
    };

    const handleSave = () => {
        axios.post(`/api/tasks/${pageName}`, { tasks: taskList })
            .then(response => {
                router.push(`/pages/${pageName}`);
            })
            .catch(error => {
                console.error('Error saving tasks:', error);
            });
    };

    return (
        <div>
            <h1>Layout Builder de {pageName}</h1>
            <button onClick={addColumn}>Agregar Seccion</button>
            <DragDropContext onDragEnd={onDragEnd}>
                {taskList.map((column, index) => (
                    <Column
                        key={index}
                        droppableId={column.groupName}
                        tasks={column.tasks}
                        type="TASK"
                        addTask={addTask}
                        removeTask={removeTask}
                        removeColumn={removeColumn}
                        editTask={editTask}
                    />
                ))}
            </DragDropContext>
            <button onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default LayoutBuilder;
