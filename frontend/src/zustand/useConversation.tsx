import { create } from "zustand";

//!----------------------------------------------------------------------------------------!//

export interface Message {
    _id: string;
    id: number;
    senderId: string;
    message: string;
    createdAt: string;
    shouldShake: any; //?????????????
}

//*----------------------------------------------------------------------------------------*//

interface Conversation {
    _id: string;
    fullname: string;
    profilePic: string;
}

//*----------------------------------------------------------------------------------------*//

interface ConversationState {
    selectedConversation: Conversation | null;
    setSelectedConversation: (selectedConversation: Conversation | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

//!----------------------------------------------------------------------------------------!//

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages })
}));

//!----------------------------------------------------------------------------------------!//

export default useConversation;