import {useCallback, useContext, useEffect, useState} from "react";
import {EnvironmentContext} from "../environment/environment.context.ts";
import {Room, User} from "../types/types.ts";

interface UseRoomProps {
    user: User;
}

export function useRoom({user}: UseRoomProps) {
    const [rooms, setRooms] = useState<Room[]>([])
    const [activeRoom, setActiveRoom] = useState<Room>()
    const {apiUrl} = useContext(EnvironmentContext);
    useEffect(() => {
        (async () => {
            const response = await fetch(`${apiUrl}/room/user/${user.id}`, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const rooms = await response.json()
                setRooms(rooms)
                if (rooms.length) {
                    setActiveRoom(rooms[0])
                }
            }
        })()

    }, [apiUrl, user]);

    const createRoom = useCallback(async (roomName: string) => {
        const response = await fetch(`${apiUrl}/room`, {
            method: 'POST', body: JSON.stringify({roomName, creatorId: user.id}), headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            switch(response.status){
                case 409:
                    throw new Error("Ce nom de salon existe déjà")
                default:
                    throw new Error("Erreur interne")
            }
        }
            const room = await response.json()
            setRooms((rooms) => [...rooms, room])

    }, [apiUrl, user.id])

    const joinRoom = useCallback(async (roomName: string) => {
        const response = await fetch(`${apiUrl}/room/join`, {
            method: 'POST', body: JSON.stringify({roomName, userId: user.id}), headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            switch(response.status){
                case 404:
                    throw new Error("Ce salon n'existe pas")
                case 409:
                    throw new Error("Vous êtes déjà dans ce salon")
                default:
                    throw new Error("Erreur interne")
            }
        }
        const room = await response.json()
        setRooms((rooms) => [...rooms, room])
    }, [apiUrl, user.id])

    const deleteRoom = useCallback(()=> {
        // TODO 3
    }, [])

    return {rooms, activeRoom, createRoom, joinRoom, setActiveRoom, deleteRoom}

}