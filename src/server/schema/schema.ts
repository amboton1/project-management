import { GraphQLSchema } from "graphql";
import { GraphQLList } from "graphql";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import Client from '../models/Client';
import Project from '../models/Project';

// types
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientID: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      projects: {
        type: new GraphQLList(ProjectType),
        resolve() {
            return Project.find();
        }
      },
      clients: {
        type: new GraphQLList(ClientType),
        resolve() {
            return Client.find();
        }
      },
      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Client.findById(args.id);
        }
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Project.find(args.id);
        }
      }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})