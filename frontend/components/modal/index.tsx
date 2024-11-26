import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className='w-full flex justify-between items-start'>
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <button onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;