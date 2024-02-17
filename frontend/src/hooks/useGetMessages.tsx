import { useEffect, useState } from "react";
import useConversation, { Message } from "../zustand/useConversation";
import toast from "react-hot-toast";

//!----------------------------------------------------------------------------------------!//

interface GetMessageResult {
    messages: Message[];
    loading: boolean;
}

//!----------------------------------------------------------------------------------------!//

const useGetMessages = (): GetMessageResult => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async (): Promise<void> => {
            setLoading(true);

            try {
                const res = await fetch(`/api/messages/${selectedConversation?._id}`);
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setMessages(data);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return { messages, loading };
}

//!----------------------------------------------------------------------------------------!//

export default useGetMessages