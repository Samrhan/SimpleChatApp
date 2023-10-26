import {Room} from "../types/types.ts";
import {PropsWithChildren} from "react";

interface ChatRoomListProps extends PropsWithChildren {
    rooms: Room[];
    onRoomSelect: (room: Room) => void;
    selectedRoom?: Room;
}
export function ChatRoomList({ rooms, onRoomSelect, selectedRoom, children }: ChatRoomListProps) {
    return (
        <div className="bg-gray-200 w-1/4 h-screen overflow-y-auto">
            <div className="flex justify-center gap-x-5 py-2">
            {children}
            </div>
            <div className="flex justify-center px-4 pb-4 font-bold">

                <h1>Liste des salons</h1>
            </div>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id} className={`p-4 hover:bg-gray-300 ${selectedRoom?.id === room.id ? 'bg-gray-300' : ''}`} onClick={() => onRoomSelect(room)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}