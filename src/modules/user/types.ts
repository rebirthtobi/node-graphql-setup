import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
    @Field(type => Int)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field({ nullable: true })
    deletedAt?: Date;
}
