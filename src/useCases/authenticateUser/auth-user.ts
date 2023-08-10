import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { client } from '../../prisma/client';

interface IRequest {
    username: string;
    password: string;
}

export class AuthenticateUser {

    async execute({ username, password }: IRequest) {
        //varificar se o usuario existe
        const userAlreadyExists = await client.user.findFirst({
            where: { username }
        });

        if (!userAlreadyExists) throw new Error("User or password icorrect!");

        //verificar se a senha está correta
        const passwordMatch = await compare(password, userAlreadyExists.password);

        if (!passwordMatch) throw new Error("User or password icorrect!");

        //gerar o token do usuario
        const key = process.env.PRIVATE_KEY || '';
        const token = sign({}, key, {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        })

        return { token };

    }
}