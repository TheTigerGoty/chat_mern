import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

//!----------------------------------------------------------------------------------------!//

interface SendMessageResult {
    sendMessage: (message: string) => Promise<void>;
    loading: boolean;
}

//!----------------------------------------------------------------------------------------!//

const useSendMessage = (): SendMessageResult => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string): Promise<void> => {
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            setMessages([...messages, data])
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return { sendMessage, loading }
}

//!----------------------------------------------------------------------------------------!//

export default useSendMessage;