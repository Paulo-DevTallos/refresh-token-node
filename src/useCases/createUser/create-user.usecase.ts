import { genSalt, hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
    name: string;
    password: string;
    username: string;
}

export class CreateUserUseCase {

    async execute({ name, username, password }: IUserRequest) {
        //verificar se o usuario exist
        const userAlreadyExists = await client.user.findFirst({
            where: { username }
        });

        if (userAlreadyExists) throw new Error("User already exists!");
        
        //cadastrar o usuário
        const salt = await genSalt();
        const hashPassword = await hash(password, salt);

        const user = await client.user.create({
            data: {
                name,
                username,
                password: hashPassword,
            }
        });

        return user;
    }
}