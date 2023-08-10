import { compare } from 'bcryptjs';
import { client } from '../../prisma/client';
import { GenerateRefreshToken } from '../../provider/generate.refresh-token';
import { GenerateToken } from '../../provider/generate.token';
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

        const generateToken = new GenerateToken();
        const token = await generateToken.execute(userAlreadyExists.id);

        //remover qualquer token que exista antes de fazer o refresh
        await client.refreshToken.deleteMany({
            where: { userId: userAlreadyExists.id }
        })

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

        return { token, refreshToken };

    }
}