import React from 'react'
import {useMutation} from '@apollo/client'
import {REMOVE_CLIENT} from '../mutations/clientMutation'
import{GET_CLIENTS} from '../queries/clientQuery'
import {FaTrash} from 'react-icons/fa'
type IClient ={
    client :{
        id: string,
        name: string,
        email: string,
        phone: string,
    }
}

function ClientRow({client} : IClient) {
    const [deleteClient] = useMutation(REMOVE_CLIENT, {
        variables : {id : client.id},
        refetchQueries: [{query: GET_CLIENTS}],
        // update(cache, { data: { deleteClient } }) {
        //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //   cache.writeQuery({
        //     query: GET_CLIENTS,
        //     data: {
        //       clients: clients.filter((client) => client.id !== deleteClient.id),
        //     },
        //   });
        // },
    })

    return (
        <tr>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.phone}</td>
          <td>
            <button className='btn btn-danger btn-sm' onClick={() =>deleteClient()}>
              <FaTrash />
            </button>
          </td>
        </tr>
      );
}

export default ClientRow