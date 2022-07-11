import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import Client from "../../models/Client";
import Project from "../../models/Project";
import { projectStatus, projectStatusUpdate } from "../enums/enums";
const { ProjectType, ClientType } = require('../types/types');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                // new client
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });

                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, args) => {
                return Client.findByIdAndRemove(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLEnumType(projectStatus) },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });

                return project.save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return Project.findByIdAndRemove(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { type: new GraphQLEnumType(projectStatusUpdate) },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return Project.findOneAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                            clientId: args.clientId
                        },
                    },
                    { new: true }
                )
            }
        }
    }
})

export default mutation;