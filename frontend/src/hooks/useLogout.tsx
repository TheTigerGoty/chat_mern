import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

//!----------------------------------------------------------------------------------------!//

interface LogoutResult {
    loading: boolean;
    logout: () => Promise<void>;
}

//!----------------------------------------------------------------------------------------!//

const useLogout = (): LogoutResult => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if ('error' in data) {
                throw new Error(data.error)
            };

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setLoading(false)
        }
    };

    return { loading, logout }
}

//!----------------------------------------------------------------------------------------!//

export default useLogout;