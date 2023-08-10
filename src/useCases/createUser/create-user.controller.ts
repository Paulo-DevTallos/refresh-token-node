import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, username, password } = req.body;

        const userData = {
            name,
            username,
            password,
        }
        
        const create = new CreateUserUseCase();

        const user = await create.execute(userData)

        return res.status(201).json(user);
    }
}