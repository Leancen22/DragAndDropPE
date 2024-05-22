'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Text from '@/components/Text';

const ViewPage = () => {
    const [taskList, setTaskList] = useState([]);
    const params = useParams();
    const router = useRouter();
    const { pageName } = params;

    useEffect(() => {
        const savedTaskList = JSON.parse(localStorage.getItem(pageName));
        if (savedTaskList) {
            setTaskList(savedTaskList);
        } else {
            router.replace('/404');
        }
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
            <h1>{pageName}</h1>
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

export default ViewPage;
