import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    query {
        projects {
            id
            name
            description
            status
        }
    }
`;

export const GET_SINGLE_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;