import React, { useState } from 'react';

interface CreateRoomModalProps {
    onClose: () => void;
    onSubmit: (roomName: string) => void;
    title: string;
    button: string;
    errorMessage?: string
}

export function RoomModal({ onClose, onSubmit, title, button, errorMessage }: CreateRoomModalProps) {
    const [roomName, setRoomName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomName.trim()) {
            onSubmit(roomName);
        }
    };

    return (<>
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Nom du salon"
                        className="p-2 border rounded w-full"
                    />
                    <div className="text-red-500">
                        {errorMessage}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{button}</button>
                    </div>
                </form>
            </div>
        </div>
            <div className="absolute inset-0 bg-black opacity-40 z-0" onClick={onClose}></div>
        </>
    );
}