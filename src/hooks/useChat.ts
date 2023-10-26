import {Message, Room, User} from "../types/types.ts";
import {useContext, useEffect, useMemo, useState} from "react";
import {EnvironmentContext} from "../environment/environment.context.ts";
import {io} from "socket.io-client";

interface UseChatProps {
    user: User;
    room?: Room;
}

export function useChat({user, room}: UseChatProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const {apiUrl, wsUrl} = useContext(EnvironmentContext);

    // Socket connection
    const socket = useMemo(() => {
        if (!room) {
            return;
        }
        return io(wsUrl, {
            extraHeaders: {
                roomId: room.id
            }
        })
    }, [wsUrl, room]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.connect();

        socket.on('chat', async (message: Message) => {
            setMessages((messages) => [...messages, message])
        });

        socket.on("delete", async (/*messageId: string*/) => {
            // TODO 1
        });

        socket.on("edit", async (/*message: Message*/) => {
            // TODO 2
        });

        return () => {
            socket.disconnect();
        }
    }, [socket]);

    useEffect(() => {
        if (room) {
            (async () => {
                const response = await
                    fetch(`${apiUrl}/chat/${room.id}`, {
                        method: 'GET', headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                if (!response.ok) {
                    return;
                }
                const messages = await response.json()
                setMessages(messages)
            })()
        }

    }, [apiUrl, room]);

    const sendMessage = async (content: string) => {
        if (!room) {
            return;
        }
        await fetch(`${apiUrl}/chat`, {
            method: 'POST',
            body: JSON.stringify({content, userId: user.id, roomId: room.id}),
            headers: {'Content-Type': 'application/json'}
        })
    }

    const deleteMessage = async (/*TODO 1*/) => {
        // TODO 1
    }

    const editMessage = async (/*TODO 2*/) =>{
        // TODO 2
    }

    return {messages, sendMessage, editMessage, deleteMessage}

}