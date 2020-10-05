/* eslint-disable camelcase */
import { Router } from 'express';
import bodyParser from 'body-parser';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

const jsonParser = bodyParser.json();

sessionsRouter.post('/', jsonParser, async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;