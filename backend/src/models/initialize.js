import User from './user.model.js';

function initModels(sequelize) {
    User.initialize(sequelize);
}

export { initModels, User };
