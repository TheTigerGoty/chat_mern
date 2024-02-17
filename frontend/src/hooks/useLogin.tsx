import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";

//!----------------------------------------------------------------------------------------!//

interface LoginResult {
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
}

//!----------------------------------------------------------------------------------------!//

const useLogin = (): LoginResult => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username: string, password: string): Promise<void> => {

        const succes = handleFormularioErros(username, password)
        if (!succes) return

        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setLoading(false)
        }
    };

    return { loading, login };
}

//!----------------------------------------------------------------------------------------!//

export default useLogin;

//!----------------------------------------------------------------------------------------!//

function handleFormularioErros(username: string, password: string) {
    if (!username || !password) {
        toast.error('Porfavor, llenar los espacios faltantes');
        return false;
    }

    return true
}