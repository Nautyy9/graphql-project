import { clientModel } from '../models/ClientSchema';
import { projectModel } from '../models/ProjectSchema';

enum Status {
    "NOT STARTED" ,
    "IN PROGRESS",
    COMPLETED,
}

type clientType = {
    name: string,
    phone : string,
    email : string,
}

const resolvers ={
    Query :{
        clients() {
            return clientModel.find()
        },
        client : (parent : any, args : {id: string}) => {
            return clientModel.findById(args.id)
        },
        projects() {
            return projectModel.find()
        },
        project: (parent : any, args : {id: string}) => {
            return projectModel.findById(args.id)
        }
    },
    Mutation :{
        addClient: (parent: any, args: {input :{ name: string, email: string, phone: string}}) => {
            const {email, phone, name} = args.input
            const addclient = new clientModel({
                name ,
                phone,
                email
            }) 
            return addclient.save()
    },
    deleteClient: (parent: any, args: {input:{ name: string, description: string, status:Status, clientId: clientType }}) =>{

},
},}
export default resolvers