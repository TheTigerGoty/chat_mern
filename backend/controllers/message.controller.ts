import { Request, Response } from 'express';
import Conversation from '../models/conversation.model';
import Message from '../models/message.model';
import { UserInterface } from '../models/user.model';
import { getReceiverSocketId, io } from '../socket/socket';

//!----------------------------------------------------------------------------------------!//

interface AuthenticatedRequest extends Request {
    user?: UserInterface;
}

//!----------------------------------------------------------------------------------------!//

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        if (!senderId) {
            return res.status(401).json({ error: 'No Autorizado - Usuario no Encontrado' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        };

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            console.log(`Emitting 'newMessage' to ${receiverSocketId}`);

            io.to(receiverSocketId).emit('newMessage', newMessage)
        };

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error en sendMessage controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}

//*----------------------------------------------------------------------------------------*//

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;

        if (!senderId) {
            return res.status(401).json({ error: 'No Autorizado - Usuario no Encontrado' });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log('Error en getMessages controller', (error as Error).message);
        res.status(500).json({ error: 'Error Interno del Servidor' })
    }
}
