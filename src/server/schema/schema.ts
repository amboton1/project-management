import { GraphQLSchema } from "graphql";
import { GraphQLList } from "graphql";
import { GraphQLID, GraphQLObjectType } from "graphql";
import Client from '../models/Client';
import Project from '../models/Project';
import mutation from "./mutation/mutation";

const { ProjectType, ClientType } = require('./types/types');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      projects: {
        type: new GraphQLList(ProjectType),
        resolve: (parent, args) => {
            return Project.find();
        }
      },
      clients: {
        type: new GraphQLList(ClientType),
        resolve: (parent, args) => {
            return Client.find();
        }
      },
      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve: (parent, args) => {
            return Client.findById(args.id);
        }
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve: (parent, args) => {
            return Project.findById(args.id);
        }
      },
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})