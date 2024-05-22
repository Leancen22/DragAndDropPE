'use client'

import React, { useState, useEffect } from 'react';
import { useRouter  } from 'next/navigation';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '@/app/components/Column';
import helper from '@/app/utils/helper_functions';
import Link from 'next/link';
import axios from 'axios';

const HomePage = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get('/api/pages')
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                console.error('Error fetching pages:', error);
            });
    }, []);

    return (
        <div>
            <h1>List of Pages</h1>
            <ul>
                {pages.map((page, index) => (
                    <li key={index} style={{display: "flex", gap: "10px"}}>
                        <span>{page}</span>
                        <Link href={`/pages/builder/${page}`}><button>Go to Layout Builder</button></Link>
                        <Link href={`/pages/${page}`}><button>Go to page</button></Link>
                    </li>
                ))}
            </ul>
            <Link href="/pages/create">
                <button>Create New Page</button>
            </Link>
        </div>
    );
};

export default HomePage;

