import express from "express";
import dotenv from "dotenv"
import { AppDataSource } from "./data-source";
import bookRoutes from "./routes/bookRoutes"
import { seedDatabase } from "./seed";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
AppDataSource.initialize()
    .then(async () => {
        await seedDatabase();

        app.use("/api", bookRoutes)
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log("Database connection error", error)
    })