import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";

//!----------------------------------------------------------------------------------------!//

const Messages: React.FC = () => {

    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100);
    }, [messages])

    return (
        <div className="px-4 flex-1 overflow-auto">

            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading &&
                [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading &&
                messages.length === 0 && (
                    <p className="text-center">Envia un mensaje para comenzar la conversacion</p>
                )}
        </div>
    )
}

//!----------------------------------------------------------------------------------------!//

export default Messages;