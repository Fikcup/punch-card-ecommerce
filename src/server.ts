// ext dependencies
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

// int dependencies
import { typeDefs } from "./schemas/typeDefs";

async function startApolloServer() {
    const server = new ApolloServer({ 
        schema: makeExecutableSchema({ typeDefs }),
    });
    const { url } = await startStandaloneServer(server);
    
    console.log(`Use GraphQL at ${url}`);
};

startApolloServer();
