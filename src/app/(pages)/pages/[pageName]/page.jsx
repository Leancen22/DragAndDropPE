'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Text from '@/components/Text';

const DynamicPage = () => {
    const { pageName } = useParams();
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        axios.get(`/api/tasks/${pageName}`)
            .then(response => {
                setTaskList(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, [pageName]);

    const renderComponent = (task) => {
        switch (task.type) {
            case 'Text':
                return <Text text={task.data.text} />;
            case 'Image':
                return <img src={task.data.url} alt={task.data.alt} />;
            case 'Menu':
                return (
                    <ul>
                        {task.data.links.map((link, idx) => (
                            <li key={idx}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Page: {pageName}</h1>
            {taskList.map((column, columnIndex) => (
                <div key={columnIndex}>
                    <h2>{column.groupName}</h2>
                    {column.tasks.map((task, taskIndex) => (
                        <div key={task.id} style={{ margin: '16px 0', padding: '8px', border: '1px solid lightgrey', borderRadius: '4px' }}>
                            <h4>{task.title}</h4>
                            {renderComponent(task)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DynamicPage;
