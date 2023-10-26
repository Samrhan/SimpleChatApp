import {Message} from "../types/types.ts";
import { useEffect, useRef, useState, KeyboardEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
interface ChatWindowProps {
    messages: Message[];
    sendMessage: (message: string)=>void;
}
export function ChatWindow({ messages, sendMessage }: ChatWindowProps) {
    const [messageContent, setMessageContent] = useState<string>('');
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (messageContent.trim()) {
            sendMessage(messageContent);
            setMessageContent('');
        }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>)=> {
        if(event.key !== 'Enter'){
            return;
        }
        handleSendMessage();
    }

    return (
        <div className="flex flex-col h-screen w-3/4">
            <div ref={chatContainerRef} className="flex-col-reverse flex-1 overflow-y-auto bg-white text-gray-900">
                {messages.map((message) => (
                    <div key={message.id} className="p-4 border-b border-gray-300">
                        <strong>{message.user.username}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div className="border-t py-4 pr-4 bg-gray-200 flex justify-end items-center gap-x-4">
                <input
                    type="text"
                    value={messageContent}
                    onChange={e => setMessageContent(e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Tapez votre message..."
                    onKeyUp={handleKeyUp}
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-auto bg-blue-500 text-white p-2 rounded inline-flex justify-center items-center px-4"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>&nbsp;Envoyer</span>
                </button>
            </div>
        </div>
    );
}