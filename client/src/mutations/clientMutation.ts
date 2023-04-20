import {gql} from '@apollo/client'

export const ADD_CLIENT = gql`
    mutation addClient($name: String!, $phone: String!, $email: String!){
        addClient(name: $name, phone: $phone, email: $email){
            id
            name,
            email,
            phone
        }
    }
`

export const REMOVE_CLIENT = gql`  
    mutation deleteClient($id : ID!) {
        deleteClient(id: $id) 
        {
            name,
            email,
            phone,
            id
        }
    }

`
