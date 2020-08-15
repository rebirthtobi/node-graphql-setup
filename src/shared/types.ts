import { registerEnumType } from "type-graphql";

// eslint-disable-next-line import/prefer-default-export
export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}

registerEnumType(UserType, {
    name:        "UserType",
    description: "Available user types",
});
