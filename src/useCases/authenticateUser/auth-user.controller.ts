import { Request, Response } from "express";
import { AuthenticateUser } from "./auth-user";

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;

        const authUser = new AuthenticateUser();

        const token = await authUser.execute({
            username,
            password
        });

        return res.status(200).json(token);
    }
}