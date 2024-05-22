'use client'

import React, { useState, useEffect } from 'react';
import { useRouter  } from 'next/navigation';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '@/app/components/Column';
import helper from '@/app/utils/helper_functions';
import ConfirmationModal from '@/app/components/ConfirmationModal';
import Link from 'next/link';
import axios from 'axios';
import ComponentIntro from '@/components/ComponentIntro';

const HomePage = () => {
    const [pages, setPages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageToDelete, setPageToDelete] = useState(null);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = () => {
        axios.get('/api/pages')
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                console.error('Error fetching pages:', error);
            });
    };

    const handleDelete = (pageName) => {
        setPageToDelete(pageName);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        axios.delete('/api/pages', { data: { pageName: pageToDelete } })
            .then(response => {
                fetchPages();
                setIsModalOpen(false);
                setPageToDelete(null);
            })
            .catch(error => {
                console.error('Error deleting page:', error);
            });
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setPageToDelete(null);
    };

    return (
        <div>
            <h1>Lista de Paginas</h1>
            <ul>
                {pages.map((page, index) => (
                    <li key={index} style={{display: "flex", gap: "10px"}}>
                        <span>{page}</span>
                        <Link href={`/pages/builder/${page}`}><button>Ir a layout builder</button></Link>
                        <Link href={`/pages/${page}`}><button>Ir a la pagina</button></Link>
                        <button onClick={() => handleDelete(page)}>Borrar</button>
                    </li>
                ))}
            </ul>
            <Link href="/pages/create">
                <button>Crear nueva pagina</button>
            </Link>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                message={`Estas seguro de querer eliminar la pagina: "${pageToDelete}"?`}
            />
        </div>
    );
};

export default HomePage;

