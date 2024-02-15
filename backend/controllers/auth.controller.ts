import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/user.model';
import generateTokenAndSetCookie from '../utils/generateToken';

//!----------------------------------------------------------------------------------------!//

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Las contraseñas no coinciden' })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'El Nombre de Usuario ya existe' })
        }

        //Hasheo de contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: 'Datos de Usuario Invalido' })
        }
    } catch (error) {
        console.log('Error en signup controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}

//*----------------------------------------------------------------------------------------*//

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Usuario o contaseña invalida' })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log('Error en login controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}

//*----------------------------------------------------------------------------------------*//

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: 'Sesion Cerrada Exitosamente' })
    } catch (error) {
        console.log('Error en logout controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}