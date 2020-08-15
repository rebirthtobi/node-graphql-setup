import { GraphQLModule } from "@graphql-modules/core";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import UserProvider from "./provider";
import UserResolver from "./resolver";

const userModule: GraphQLModule = new GraphQLModule({
    providers:    [UserProvider, UserResolver],
    extraSchemas: [
        buildSchemaSync({
            resolvers: [UserResolver],
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            container: ({ context }): Injector<Session> => userModule.injector.getSessionInjector(context),
        }),
    ],
});

export default userModule;
