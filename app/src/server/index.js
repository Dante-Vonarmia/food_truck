const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const http = require('http');
require('dotenv').config();

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await server.stop();
          }
        };
      },
    },
  ],
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3000;
  console.log('Server starting...');
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
