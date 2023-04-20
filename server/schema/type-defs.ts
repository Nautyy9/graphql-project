import { gql } from "apollo-server"

const typeDefs = gql`
    type ClientType {
        id: ID!
        name: String!
        email: String!
        phone: String!
    },
    enum Status {
        NOT STARTED,
        IN PROGRESS,
        COMPLETED
    },
    type ProjectType {
        id: ID!,
        name : String!
        description : String!
        status : Status = NOT STARTED
    }
    type Query {
        clients : [ClientType!]!
        client(id: ID!) : ClientType!
        projects : [ProjectType!]!
        project(id: ID!) : ProjectType!
    }

    input AddClientType {
        name : String!
        email : String!
        phone : String!
    }
    input AddProjectType{
        name : String!
        description : String!
        status : Status = NOT STARTED
        clientId : ClientType!
    }
    type Mutation {
        addClient(input : AddClientType) : ClientType
        deleteClient(id: ID!) : ClientType,
        addProject (input : AddProjectType!) : ProjectType,
        deleteProject(id: ID!) : ProjectType
        updateProject(id: ID!) : ProjectType
    }
`


export default typeDefs