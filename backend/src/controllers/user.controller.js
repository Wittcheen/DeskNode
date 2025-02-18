import UserService from '../services/user.service.js';

class UserController {
    static async create(req, res) {
        const { firstName, lastName, email } = req.body;
        if (![firstName, lastName, email].every(Boolean)) {
            return res.sendStatus(400);
        }
        if (await UserService.getByEmail(email)) {
            return res.sendStatus(409);
        }
        await UserService.create({ firstName, lastName, email });
        return res.sendStatus(201);
    }

    static async getAll(req, res) {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    }

    static async getByEmail(req, res) {
        const user = await UserService.getByEmail(req.params.email);
        if (!user) { return res.sendStatus(404); }
        return res.status(200).json(user);
    }

    static async update(req, res) {
        const { firstName, lastName, email, accountStatus } = req.body;
        if (![firstName, lastName, email, accountStatus].every(Boolean)) {
            return res.sendStatus(400);
        }
        const updatedUser = await UserService.update(req.params.id, { firstName, lastName, email, accountStatus });
        if (!updatedUser) { return res.sendStatus(404); }
        return res.sendStatus(204);
    }

    static async delete(req, res) {
        const deleted = await UserService.delete(req.params.id);
        if (!deleted) { return res.sendStatus(404); }
        return res.sendStatus(204);
    }

    static async login(req, res) {
        const { email, password } = req.body;
        if (![email, password].every(Boolean)) {
            return res.sendStatus(400);
        }
        const result = await UserService.login(email, password);
        return res.status(result.code).json({ status: result.status });
    }

    static async changePassword(req, res) {
        const { newPassword } = req.body;
        if (![newPassword].every(Boolean)) {
            return res.sendStatus(400);
        }
        const result = await UserService.changePassword(req.params.email, newPassword);
        return res.status(result.code).json({ status: result.status });
    }
}

export default UserController;
