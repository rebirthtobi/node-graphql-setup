import { DataTypes, Model } from "sequelize";
import seq from "./index";

export default class User extends Model {
    id: number;

    firstName: string;

    lastName: string;

    phoneNumber: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    readonly deletedAt: Date;
}

User.init({
    id: {
        type:          DataTypes.BIGINT,
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
    },
    firstName: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type:      DataTypes.STRING,
        unique:    true,
        allowNull: false,
    },
    createdAt: {
        allowNull:    false,
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        allowNull:    false,
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        allowNull: true,
        type:      DataTypes.DATE,
    },
}, {
    paranoid:    true,
    sequelize:   seq,
    tableName:   "users",
    timestamps:  true,
    underscored: true,
});
