import { Arg, Query, Resolver } from "type-graphql";
import UserProvider from "./provider";
import User from "./types";

@Resolver(of => User)
export default class UserResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly userProvider: UserProvider) {}

    @Query(returns => User, { nullable: true })
    async user(@Arg("phoneNumber") phoneNumber: string): Promise<User | null> {
        return this.userProvider.getUser(phoneNumber);
    }

    @Query(returns => [User])
    async users(): Promise<Array<User>> {
        return this.userProvider.getUsers();
    }
}
