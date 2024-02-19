"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
//!----------------------------------------------------------------------------------------!//
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'No Autorizado - No se Provee Token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'No Autorizado - Token Invalido' });
        }
        const user = yield user_model_1.default.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no Encontrado' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log('Error en protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
});
//!----------------------------------------------------------------------------------------!//
exports.default = protectRoute;
