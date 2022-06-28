import { GraphQLSchema } from "graphql";
import { GraphQLList } from "graphql";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { clients, projects } from "../sampleData";

// types
const Client = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const Project = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientID: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: Client,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      projects: {
        type: new GraphQLList(Project),
        resolve() {
            return projects;
        }
      },
      clients: {
        type: new GraphQLList(Client),
        resolve() {
            return clients;
        }
      },
      client: {
        type: Client,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return clients.find(client => client.id === args.id);
        }
      },
      project: {
        type: Project,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return projects.find(project => project.id === args.id);
        }
      }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})