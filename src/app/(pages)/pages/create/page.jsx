'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreatePage = () => {
    const router = useRouter();
    const [pageName, setPageName] = useState('');

    const handleCreate = () => {
        if (!pageName.trim()) {
            alert('Nombre de pagina requerido');
            return;
        }

        console.log('Creating page:', pageName);

        axios.post('/api/pages', { pageName })
            .then(response => {
                console.log('Page created successfully:', response.data);
                router.push(`/pages/builder/${pageName}`);
            })
            .catch(error => {
                console.error('Error creating page:', error);
                alert(error.response?.data?.error || 'Error creating page');
            });
    };

    return (
        <div>
            <h1>Crear nueva pagina</h1>
            <input
                type="text"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                placeholder="Enter page name"
            />
            <button onClick={handleCreate}>Crear e ir al layout</button>
        </div>
    );
};

export default CreatePage;
