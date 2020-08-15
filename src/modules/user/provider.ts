import { Injectable } from "@graphql-modules/di";
import User from "@models/user";

@Injectable()
export default class UserProvider {
    async getUser(phoneNumber: string): Promise<User | null> {
        return User.findOne({ where: { phoneNumber } });
    }

    async getUserByPhone(phoneNumber: string): Promise<User | null> {
        return User.findOne({
            where: { phoneNumber },
            raw:   true,
        });
    }

    async getUsers(): Promise<Array<User>> {
        return User.findAll();
    }
}
