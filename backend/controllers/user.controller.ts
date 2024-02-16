import { Request, Response } from 'express';
import User, { UserInterface } from '../models/user.model';

//!----------------------------------------------------------------------------------------!//

interface AuthenticatedRequest extends Request {
    user?: UserInterface;
}

//!----------------------------------------------------------------------------------------!//

export const getUsersForSidebar = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const loggedInUserId = req.user?._id;

        if (!loggedInUserId) {
            return res.status(401).json({ error: 'No Autorizado - Usuario no Encontrado' });
        }
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error en getUsersForSidebar controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}