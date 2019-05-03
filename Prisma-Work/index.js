const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./src/generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone.`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    link: (parent, { id }, context) => { 
    }
  },
  Mutation: {
    add: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    update: (parent, args) => { 
    },
    delete: (parent, { id }) => {
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma },
});
server.start(({ port }) =>
  console.log(`server is running on http://localhost:${port}`)
);
