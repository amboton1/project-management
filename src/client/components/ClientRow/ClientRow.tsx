import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../mutations/ClientMutation";
import { GET_CLIENTS } from "../../queries/Client.query";

interface ClientDataType {
    client: {
        id: string,
        name: string,
        email: string,
        phone: string
    }
}

const ClientRow = ({ client }: ClientDataType) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache, { data: { deleteClient } }) {
        const { clients }: Record<string, string>[] | any = cache.readQuery({
            query: GET_CLIENTS
        });

        cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: clients.filter((client: Record<string,string>) => client.id !== deleteClient.id) }
        })
    }
  });

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {client.name}
        </th>
        <td className="px-6 py-4">
            {client.email}
        </td>
        <td className="px-6 py-4">
            {client.phone}
        </td>
        <td className="px-6 py-4">
            <div onClick={() => deleteClient({ variables: { id: client.id } })} className="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width={20} height={20} viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>
            </div>
        </td>
    </tr>
  )
}
export default ClientRow