import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.json({
        service: "API Gateway",
        status: "Running"
    });
});


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Gateway listening on ${PORT}`);
});