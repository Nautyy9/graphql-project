import { resolve } from "path";
import { projects, clients } from "../sampleData";
import { clientModel } from '../models/ClientSchema';
import { projectModel } from '../models/ProjectSchema';

import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";


// Basically what we are doing here is creating a schema for user having a name of Client and {name, phone, emial, id } as fields of it
// then we used this schema as nested schema within root schema (Root Type) this is having a name of 'RootQueryType' and fields is an object of
// having type -> which is our ClientType + it recieve some args that is the id we pass in when we make req, and resolve function that we used in
// our previous gql tut that is essential to respond to req that are made by client , here client pass an id and we match if that id is under a user
// if so we say user exists else create new user

// !! imp thing to note is that we have a fields function in Client Type while we have fields object in RootQueryType ?
// this is because the client type must call the function and return this object having  {name, phone, emial, id } properties
// so if we create a user we need to send back the details or even if user exists that is with RootQueryType then even we send back details
// while with RootQueryType the object is because it is not sending back any data it's just manipulating that data , i.e resolve is send data based on filtering

//? Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {type : GraphQLID},
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// const  ClientType = gql`{

// }`

//? 
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID},
        client: { 
            type: ClientType,
            resolve(parent , args) {
                return clientModel.findById(parent.clientId);
            }
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
    })
}) 


//? Root Type
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects :{
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {

            return projectModel.find()
            
        }
    },
    project: {
        type: ProjectType,
        args: {id : {type: GraphQLID}},
        resolve(parent, args) {
            return projectModel.findById(args.id)
        }
    },
    clients : {
        type: new GraphQLList(ClientType),
        resolve(parent, args){
            return clientModel.find()
        }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clientModel.findById(args.id)
      },
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields : {
    addClient : {
      type : ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type:new  GraphQLNonNull(GraphQLString)},
        phone: { type:new  GraphQLNonNull(GraphQLString)},
    },
      resolve(parent, args){
        const client = new clientModel({
          name: args.name,
          email : args.email,
          phone : args.phone
        })
        return client.save()
    }},
    deleteClient:{
      type: ClientType,
      args : {
        id: {type: new  GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        // projectModel.find({ clientId: args.id }).then((projects) => {
        //   projects.forEach((project) => {
        //     project.deleteOne();
        //   });
        // });
        return clientModel.findByIdAndRemove(args.id)
        },
      },

      addProject :{
        type: ProjectType,
        args : {
          name: { type: new GraphQLNonNull(GraphQLString)},
          description: { type: new GraphQLNonNull(GraphQLString)},
          status: { 
            type: new GraphQLEnumType ({
              name: 'ProjectStatus',
              values :{
                'new': {value : 'Not Started'},
                'progress': {value : 'In Progress'},
                'completed': {value : 'Completed'}
              }
            }),
            defaultValue:  'Not Started' 
          },
          clientId: { type: new GraphQLNonNull(GraphQLID)}
        },
        async resolve(parent, args) {
          const project = projectModel.create({
            name: args.name,
            description: args.description,
            clientId: args.clientId,
            status: args.status
          })
          return await project.then((val) => val.save()).catch((err) => err.message)
        }
      },
      deleteProject: {
        type: ProjectType,
        args : { id : { type : new GraphQLNonNull(GraphQLID)}},
        resolve(parent, args) {
          return projectModel.findByIdAndRemove(args.id)
        }

      },
      updateProject: {
        type: ProjectType,
        args : { 
          id : { type : new GraphQLNonNull(GraphQLID)},
          name: { type : GraphQLString},
          description: { type : GraphQLString},
          status: { 
            type: new GraphQLEnumType ({
              name: 'NewProjectStatus',
              values :{
                'new': {value : 'Not Started'},
                'progress': {value : 'In Progress'},
                'completed': {value : 'Completed'}
              }
            }) 
          },
      },
      resolve(parent, args) {
        return projectModel.findByIdAndUpdate(args.id, {
          $set  :{
            name : args.name,
            description : args.description,
            status: args.status
          }
        },
        {new: true}
        )
      }
      }
    }
})


export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
