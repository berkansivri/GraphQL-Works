const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone.`,
    feed: () => links,
    link: (parent, { id }) => {
      return links.find(x => x.id === id);
    }
  },
  Mutation: {
    add: (parent, args) => {
      const link = {
        id: `link-${links.length}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    update: (parent, args) => {
      var link = links.find(x => x.id === args.id);
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    delete: (parent, { id }) => {
      return links.splice(links.findIndex(x => x.id === id), 1);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "../src/schema.graphql",
  resolvers
});
server.start(({ port }) =>
  console.log(`server is running on http://localhost:${port}`)
);
