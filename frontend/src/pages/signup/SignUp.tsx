import { Link } from 'react-router-dom';
import GenderCheckBox from './GenderCheckBox';
import { ChangeEvent, FormEvent, useState } from 'react';
import useSignup from '../../hooks/useSignup';

//!----------------------------------------------------------------------------------------!//

interface Formulario {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

//!----------------------------------------------------------------------------------------!//

const SignUp = () => {

    const [formulario, setFormulario] = useState<Formulario>({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })
    const { fullname, username, password, confirmPassword, gender } = formulario

    const { loading, signup } = useSignup()

    //*----------------------------------------------------------------------------------------*//

    const handleCheckBoxChange = (gender: string) => {
        setFormulario({ ...formulario, gender })
    }

    //*----------------------------------------------------------------------------------------*//

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    //*----------------------------------------------------------------------------------------*//

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signup(formulario)
    }

    //!----------------------------------------------------------------------------------------!//

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    SignUp {''}
                    <span className="text-blue-500">ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Nombre Completo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ingresar Nombre Completo"
                            className="w-full input input-bordered h-10"
                            value={fullname}
                            name='fullname'
                            onChange={handleChange}

                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Nombre de Usuario</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ingresar Nombre de Usuario"
                            className="w-full input input-bordered h-10"
                            value={username}
                            name='username'
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
                            name='password'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirmar Contraseña</span>
                        </label>

                        <input
                            type="password"
                            placeholder="Verificar Contraseña"
                            className="w-full input input-bordered h-10"
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={handleChange}

                        />
                    </div>

                    <GenderCheckBox onCheckboxChange={handleCheckBoxChange} selectedGender={gender} />

                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block">
                        Ya tienes una cuenta? Ingresa Ahora
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : 'Registrarse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

//!----------------------------------------------------------------------------------------!//

export default SignUp;