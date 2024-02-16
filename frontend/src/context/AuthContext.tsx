import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

//!----------------------------------------------------------------------------------------!//

export interface AuthUser {
    id: number;
    username: string;
    token: string;
}

//*----------------------------------------------------------------------------------------*//

interface AuthContextProps {
    authUser: AuthUser | null;
    setAuthUser: Dispatch<SetStateAction<AuthUser | null>>
}

//*----------------------------------------------------------------------------------------*//

interface AuthContextProviderProps {
    children: ReactNode;
}

//!----------------------------------------------------------------------------------------!//

export const AuthContext = createContext<AuthContextProps>({
    authUser: null,
    setAuthUser: () => { },
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem('chat-user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}