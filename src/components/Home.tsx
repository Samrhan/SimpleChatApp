import {User} from "../types/types.ts";
import {ChatRoomList} from "./ChatRoomList.tsx";
import {ChatWindow} from "./ChatWindow.tsx";
import {useState} from "react";
import {RoomModal} from "./RoomModal.tsx";
import {useRoom} from "../hooks/useRoom.ts";
import {useChat} from "../hooks/useChat.ts";
import {faCommentMedical, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

enum Modals {
    create = 'create',
    join = 'join'
}

interface HomeProps {
    user: User
}

export function Home({user}: HomeProps) {

    const {rooms, activeRoom, createRoom, setActiveRoom, joinRoom} = useRoom({user})
    const {messages, sendMessage} = useChat({user, room: activeRoom})

    const [openedModal, setOpenedModal] = useState<Modals | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const handleRoomCreation = (roomName: string) => {
        createRoom(roomName)
            .then(handleCloseModal)
            .catch(({message}) => setErrorMessage(message));
    };

    const handleRoomJoin = (roomName: string) => {
        joinRoom(roomName)
            .then(handleCloseModal)
            .catch(({message}) => setErrorMessage(message));
    };

    const handleCloseModal = () => {
        setOpenedModal(undefined);
        setErrorMessage(undefined);
    };

    return (
        <div className="flex h-screen">
            <ChatRoomList rooms={rooms} onRoomSelect={setActiveRoom} selectedRoom={activeRoom}>
                <button onClick={() => setOpenedModal(Modals.create)}
                        className="p-2 bg-blue-500 text-white rounded inline-flex items-center">
                    <FontAwesomeIcon icon={faCommentMedical}/> <span>&nbsp;Créer un salon</span>
                </button>
                <button onClick={() => setOpenedModal(Modals.join)}
                        className="p-2 bg-blue-500 text-white rounded inline-flex items-center">
                    <FontAwesomeIcon icon={faRightToBracket}/> <span>&nbsp;Rejoindre un salon</span>
                </button>
            </ChatRoomList>
            <ChatWindow messages={messages} sendMessage={sendMessage}/>

            {openedModal && <RoomModal
                onClose={() => handleCloseModal()}
                onSubmit={openedModal === Modals.join ? handleRoomJoin : handleRoomCreation}
                button={openedModal === Modals.join ? 'Rejoindre' : 'Créer'}
                title={openedModal === Modals.join ? 'Rejoindre un salon' : 'Créer un salon'}
                errorMessage={errorMessage}
            />}
        </div>
    );

}