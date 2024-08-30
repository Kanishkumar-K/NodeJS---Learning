const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('graphqldemo', 'root', 'Kanish@123', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users',
  timestamps: false, 
});

const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(name: String!): User
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
  }

  directive @upper on FIELD_DEFINITION

  type User {
    id: ID!
    name: String! @upper
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    user: async (parent, args) => await User.findByPk(args.id),
    users: async () => await User.findAll(),
  },
  Mutation: {
    createUser: async (parent, args) => {
      const newUser = await User.create({ name: args.name });
      return newUser;
    },
    updateUser: async (parent, args) => {
      const user = await User.findByPk(args.id);
      if (!user) {
        throw new Error('User not found');
      }
      user.name = args.name;
      await user.save();
      return user;
    },
    deleteUser: async (parent, args) => {
      const user = await User.findByPk(args.id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return user;
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  await sequelize.sync();

  app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
