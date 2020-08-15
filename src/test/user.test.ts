
import User from "@models/user";
import UserModule from "@modules/user";
import { execute } from "graphql";
import gql from "graphql-tag";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { usersMock } from "./mocks";

beforeAll(() => {
    const timeout = 60000;
    jest.setTimeout(timeout);
});

describe("Testing UserModule Errors and Empty State", () => {
    it("Should return error when no id is supplied", async () => {
        const { schema } = UserModule;

        const result = await execute({
            schema,
            contextValue: {},
            document:     gql`
                query {
                    user {
                        firstName
                        lastName
                    }
                }
            `,
        });

        expect(result.errors).toBeTruthy();
    });

    it("Should return error when wrong input is supplied", async () => {
        const { schema } = UserModule;

        const result = await execute({
            schema,
            contextValue: {},
            document:     gql`
                query {
                    user(id: "56888888") {
                        firstName
                        lastName
                    }
                }
            `,
        });

        expect(result.errors).toBeTruthy();
    });

    it("Should return empty array when no user is present", async () => {
        const { schema } = UserModule;

        const result = await execute({
            schema,
            contextValue: {},
            document:     gql`
                query {
                    users {
                        firstName
                        lastName
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data).toBeTruthy();
        // eslint-disable-next-line no-magic-numbers
        expect(result.data!.users).toHaveLength(0);
    });
});

describe("Testing UserModule Filled State", () => {
    beforeAll(async done => {
        await User.truncate({
            cascade: true,
            force:   true,
        });
        await User.bulkCreate(usersMock);
        done();
    });

    afterAll(async done => {
        await User.truncate({
            cascade: true,
            force:   true,
        });
        done();
    });

    it("Should return matched user", async () => {
        const { schema } = UserModule;

        const result = await execute({
            schema,
            contextValue: {},
            document:     gql`
                query {
                    user(phoneNumber: "${usersMock[0].phoneNumber}"}") {
                        firstName
                        lastName
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data).toBeTruthy();
        expect(result.data!.user).toHaveProperty("firstName", usersMock[0].firstName);
        expect(result.data!.user).toHaveProperty("lastName", usersMock[0].lastName);
    });

    it("Should return list of users", async () => {
        const { schema } = UserModule;

        const result = await execute({
            schema,
            contextValue: {},
            document:     gql`
                query {
                    users {
                        firstName
                        lastName
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data).toBeTruthy();
        // eslint-disable-next-line no-magic-numbers
        expect(result.data!.users).toHaveLength(2);
        expect(result.data!.users).toEqual(expect.arrayContaining(usersMock.map(userMock => ({
            firstName: userMock.firstName,
            lastName:  userMock.lastName,
        }))));
    });
});
