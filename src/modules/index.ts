import { GraphQLModule } from "@graphql-modules/core";
import userModule from "@modules/user";

const rootModule = new GraphQLModule({
    imports: [
        userModule,
    ],
});

export default rootModule;
