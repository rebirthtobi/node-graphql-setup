// tslint:disable-next-line:no-import-side-effect
import "module-alias/register";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import moduleAlias from "module-alias";

if (process.env.NODE_ENV === "production") {
    moduleAlias.addAliases({
        "@shared": `${__dirname}/shared`,
        "@modules": `${__dirname}/modules`,
        "@models": `${__dirname}/models`
    })
} else {
    moduleAlias.addAliases({
        "@shared": `${__dirname}/shared`,
        "@modules": `${__dirname}/modules`,
        "@models": `${__dirname}/models`
    })
}

import appModule from "@modules/index";
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import { OK } from "http-status-codes";


const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
    schema:        appModule.schema,
    subscriptions: appModule.subscriptions,
    context:       appModule.context,
});

server.applyMiddleware({ app });

app.get("/", (req, res) => res.status(OK).json({ message: "Welcome to test API" }));
app.post("/", (req, res) => res.status(OK).json({ message: "Welcome to test API" }));

const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
    console.log("listening");
});
