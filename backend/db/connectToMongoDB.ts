import mongoose from "mongoose";

//!----------------------------------------------------------------------------------------!//

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log('Error de conexion con MongoDB', (error as Error).message);
    }
}

//!----------------------------------------------------------------------------------------!//

export default connectToMongoDB;