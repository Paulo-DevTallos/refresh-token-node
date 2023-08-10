import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refreshtoken.user";

export class RefreshTokenUserController {
     async handle(req: Request, res: Response) {
        const { refresh_token } = req.body;

        const refreshTokenUser = new RefreshTokenUserUseCase();
        const token = await refreshTokenUser.execute(refresh_token);

        return res.json(token);
    }
}