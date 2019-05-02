const { ApolloServer, gql } = require('apollo-server');

const tasks = [
  {
    id: 1,
    title: "wake up"
  },
  {
    id: 2,
    title: "checkout graphql"
  },
  {
    id: 3,
    title: "and apollo-server"
  }
];

const typeDefs = gql`
  type Task{
    id:Int
    title:String
  }

  type DeleteResult{
    DeletedId:Int
    Result:String
  }

  type Query{
    AllTasks:[Task]
    TaskById(id:Int!): Task
  }

  input TaskInput{
    id:Int!
    title:String
  }

  type Mutation{
    Insert(payload:TaskInput): Task
    Update(payload:TaskInput): Task
    Delete(id:Int!): DeleteResult
  }
`;

const resolvers = {
  Query: {
    AllTasks: () => tasks,
    TaskById: (root, { id }) => {
      return tasks.filter(t => {
          return t.id === id;
      })[0];
    }
  },

  Mutation: {
    Insert: (root, {payload}) => {
      tasks.push(payload);
      return payload;
    },
    Update: (root, {payload}) => {
      var index = tasks.findIndex(x=> x.id === payload.id);
      tasks[index].title = payload.title;

      return tasks[index];
    },
    Delete: (root, { id }) => {
      tasks.splice(tasks.findIndex(t => t.id === id), 1);
      return { DeletedId: id, Result: "Deleted" };
    }
  }
};

const start = new ApolloServer({typeDefs, resolvers});
start.listen({port: 4444}).then(({url}) => {
  console.log(`Start to listen on ${url}`);
});