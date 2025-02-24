import User from '../models/user.model.js';
import { DTO_TYPES, DTOFactory } from '../dtos/.factory.js';
import { ACCOUNT_STATUS } from '../utils/constants.js';
import PasswordManager from '../utils/password.js';

class UserService {
    async create(data) {
        return await User.create(data);
    }

    async getAll() {
        const users = await User.findAll();
        return users.map(user => DTOFactory.create(DTO_TYPES.USER, user));
    }

    async getByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return DTOFactory.create(DTO_TYPES.USER, user);
    }

    async update(id, data) {
        const [updated] = await User.update(data, { where: { id } });
        return updated ? await this.getByEmail(data.email) : null;
    }

    async delete(id) {
        return await User.update({
            firstName: "Unknown User",
            lastName: "",
            email: "",
            password: ""
        },{ where: { id } });
    }

    async login(email, password) {
        const user = await this.getByEmail(email);
        if (!user || (user.password && !PasswordManager.verify(password, user.password))) {
            return { code: 400, status: "invalid_credentials" };
        }
        if (user.accountStatus !== ACCOUNT_STATUS.ACTIVE) {
            return { code: 403, status: user.accountStatus };
        }
        return { code: 200, status: "success", user: user };
    }

    async changePassword(email, newPassword) {
        const user = await this.getByEmail(email);
        if (!user || user.accountStatus !== ACCOUNT_STATUS.CHANGE_PASSWORD) {
            return { code: 403, status: "not_allowed" };
        }
        const hashedPassword = PasswordManager.hash(newPassword);
        await user.update({ password: hashedPassword, accountStatus: ACCOUNT_STATUS.ACTIVE });
        return { code: 200, status: "success", user: user };
    }
}

export default new UserService();
