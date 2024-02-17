import { useEffect, useState } from "react"
import toast from "react-hot-toast";

//!----------------------------------------------------------------------------------------!//

interface Conversation {
    _id: string;
    profilePic: string;
    fullname: string;
}

//*----------------------------------------------------------------------------------------*//

interface GetConversationResult {
    loading: boolean;
    conversations: Conversation[];
}

//!----------------------------------------------------------------------------------------!//

const useGetConversation = (): GetConversationResult => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const getConversation = async (): Promise<void> => {
            setLoading(true);

            try {
                const res = await fetch('/api/users');
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error)
                }

                setConversations(data);
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getConversation();
    }, []);

    return { loading, conversations }
}

//!----------------------------------------------------------------------------------------!//

export default useGetConversation