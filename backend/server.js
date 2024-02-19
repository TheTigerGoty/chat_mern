"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./socket/socket");
const path_1 = __importDefault(require("path"));
//!----------------------------------------------------------------------------------------!//
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/messages", message_routes_1.default);
socket_1.app.use("/api/users", user_routes_1.default);
const currentDirname = path_1.default.resolve(__dirname);
const frontendDistPath = path_1.default.resolve(currentDirname, '../frontend/dist');
socket_1.app.use(express_1.default.static(frontendDistPath));
socket_1.app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(frontendDistPath, "index.html"));
});
socket_1.server.listen(PORT, () => {
    (0, connectToMongoDB_1.default)();
    console.log(`Sever corriendo en el puerto ${PORT}`);
});
