import {gql} from '@apollo/client'


export const GET_CLIENTS = gql`
    query getClients {
        clients {
            name,
            id,
            phone ,
            email
        }
    }
`

// export const GET_SINGLE_CLIENT = gql`
//     query getClient(id: $ID!) {
//         getClient(id: $id){
//             name ,
//             id,
//             email,
//             phone
//         }
//     }
// `