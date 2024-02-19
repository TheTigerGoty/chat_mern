import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";

//!----------------------------------------------------------------------------------------!//

interface SocketContextProps {
    socket: Socket | null;
    onlineUsers: any[]; //???????????????
}

interface SocketContextProviderProps {
    children: ReactNode;
}

//!----------------------------------------------------------------------------------------!//

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
    onlineUsers: [],
});

export const useSocketContext = (): SocketContextProps => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps): JSX.Element => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {

        if (authUser) {
            const socket = io('https://chat-mern-v4kb.onrender.com', {
                query: {
                    userId: authUser._id
                }
            });

            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })

            return () => {
                socket.close()
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}