import { sign } from "jsonwebtoken";

export class GenerateToken {
    async execute(userId: string) {
        //gerar o token do usuario
        const key = process.env.PRIVATE_KEY || '';
        const token = sign({}, key, {
            subject: userId,
            expiresIn: "20s"
        })

        return token;
    }
}