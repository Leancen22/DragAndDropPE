import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableTask = ({ task, index, removeTask, openEditModal }) => {
    const renderComponent = () => {
        switch (task.type) {
            case 'Text':
                return <p>{task.data.text}</p>;
            case 'Image':
                // return <img src={task.data.url} alt={task.data.alt} />;
                return <p> Imagen subida </p>;
            case 'Menu':
                return (
                    <>
                        <p>Menu creado</p>
                        <div style={{display: "flex", gap: "10px"}}>
                        {task.data.links.map((link, idx) => (
                            <p key={idx}>{link.name}</p>
                        ))}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        backgroundColor: '#fff',
                        border: '1px solid lightgrey',
                        borderRadius: '4px',
                        ...provided.draggableProps.style,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>{task.title}</h4>
                        <button onClick={removeTask} style={{ marginLeft: '10px', padding: '4px 8px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                        <button onClick={openEditModal} style={{ marginLeft: '10px', padding: '4px 8px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>Edit</button>
                    </div>
                    {renderComponent()}
                </div>
            )}
        </Draggable>
    );
};

export default DraggableTask;
