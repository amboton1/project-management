import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/Client.query";
import Alert from "../Alert/Alert";
import ClientRow from "../ClientRow/ClientRow";
import Spinner from "../Spinner/Spinner";

export interface ClientsType {
    clients: ClientDataType[]
}

export interface ClientDataType {
    id: string,
    name: string,
    email: string,
    phone: string
}

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const renderClients = (data: ClientsType) => {
    return data.clients.map((client: ClientDataType, index: number) => {
        return (
            <ClientRow key={index} client={client} />
        );
    });
  }

  if (loading) return <Spinner />
  if (error) return <Alert />

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {renderClients(data)}
            </tbody>
        </table>
    </div>
  )
}
export default Client