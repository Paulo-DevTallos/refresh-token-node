import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv'
import { router } from './router';

config();
const app = express();

app.use(express.json());
app.use(router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        status: "Error",
        message: error.message,
    })
})

const port = 3041;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));