import express from "express";
import dotenv from 'dotenv';
import autRoutes from "./routes/auth.routes"
import messageRoutes from "./routes/message.routes"
import userRoutes from "./routes/user.routes"
import connectToMongoDB from "./db/connectToMongoDB";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket";
import path from "path";

//!----------------------------------------------------------------------------------------!//

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", autRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const currentDirname = path.resolve(__dirname);
const frontendDistPath = path.resolve(currentDirname, '../frontend/dist');

app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Sever corriendo en el puerto ${PORT}`)
});