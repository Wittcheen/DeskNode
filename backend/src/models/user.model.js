import { DataTypes, Model } from 'sequelize';

class User extends Model {
    static initialize(sequelize) {
        User.init({
            id: {
                field: "user_id",
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                field: "first_name",
                type: DataTypes.STRING(25),
                allowNull: false
            },
            lastName: {
                field: "last_name",
                type: DataTypes.STRING(25),
                allowNull: false
            },
            email: {
                field: "email",
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            password: {
                field: "password",
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: false
        });
    }
}

export default User;
