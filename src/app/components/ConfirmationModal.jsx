'use client';

import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onConfirm}>Si</button>
                <button onClick={onClose}>No</button>
            </div>
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal {
                    background: transparent;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                button {
                    margin: 5px;
                }
            `}</style>
        </div>
    );
};

export default ConfirmationModal;
