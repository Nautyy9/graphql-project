import mongoose from "mongoose";
const clientSchema =new  mongoose.Schema({
    name: {
        type: String
    },
    email: { 
        type : String
    },
    phone: {
        type : String
    }
})
 
export const clientModel = mongoose.model('Client', clientSchema)