import { Router } from "express";
import { CreateUserController } from "../useCases/createUser/create-user.controller";
import { AuthenticateUserController } from "../useCases/authenticateUser/auth-user.controller";
import { RefreshTokenUserController } from "../useCases/refreshTokenUser/refreshtoken.controller";
import { ensureAuth } from "../middlewares/auth-middleware";

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/users/create', createUserController.handle);
router.post('/users/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.get('/courses', ensureAuth, (req, res) => {
    return res.json([
        { id: 1, name: 'NodeJS' },
        { id: 2, name: 'ReactJS' },
        { id: 3, name: 'VueJS' },
        { id: 4, name: 'MongoDB' },
    ])
})