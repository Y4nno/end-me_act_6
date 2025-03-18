const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;

const resolvers = {
    Query: {
      posts: () => prisma.post.findMany(),
    },
    Mutation: {
      createPost: (_, { title, content }) => {
        return prisma.post.create({
          data: { title, content },
        });
      },
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});