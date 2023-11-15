// ext dependencies
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

// int dependencies
import { typeDefs } from "./schemas";
import { MySQLDataSource } from "./database/connection";

async function startApolloServer() {
    const server = new ApolloServer({ 
        schema: makeExecutableSchema({ typeDefs }),
    });
    await MySQLDataSource.initialize()
    .then(async () => {
            const { url } = await startStandaloneServer(server);
            console.log(`Use GraphQL at ${url}`);
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
};

startApolloServer();
