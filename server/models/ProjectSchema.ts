import mongoose, { Schema } from "mongoose";
const projectSchema =new  mongoose.Schema({
    name: {
        type: String
    },
    description: { 
        type : String
    },
    status: {
        type : String,
        enum : ['Not Started', 'In Progress' , 'Completed']
    },
    clientId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})
 
export const projectModel = mongoose.model('Project', projectSchema)