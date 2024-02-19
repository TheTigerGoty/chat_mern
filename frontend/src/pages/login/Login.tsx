import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

//!----------------------------------------------------------------------------------------!//

const Login = () => {

    const [formularioLogin, setFormularioLogin] = useState({
        username: '',
        password: ''
    })
    const { username, password } = formularioLogin

    const { loading, login } = useLogin()

    //*----------------------------------------------------------------------------------------*//

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormularioLogin({ ...formularioLogin, [name]: value });
    };

    //*----------------------------------------------------------------------------------------*//

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(username, password)
    }

    //!----------------------------------------------------------------------------------------!//

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login {''}
                    <span className="text-blue-500">ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Nombre de Usuario</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ingresar Nombre de Usuario"
                            className="w-full input input-bordered h-10"
                            value={username}
                            name="username"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Contraseña</span>
                        </label>

                        <input
                            type="password"
                            placeholder="Ingresar Contraseña"
                            className="w-full input input-bordered h-10"
                            value={password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        No tienes una cuenta? Registrate ahora
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Ingresar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

//!----------------------------------------------------------------------------------------!//

export default Login;