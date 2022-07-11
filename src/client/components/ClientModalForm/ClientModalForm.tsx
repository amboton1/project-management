import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react"
import { ADD_CLIENT } from "../../mutations/ClientMutation";
import { GET_CLIENTS } from "../../queries/Client.query";

const ClientModalForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { name, email, phone } = formData;

  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClient } }) {
        const { clients }: Record<string, string>[] | any = cache.readQuery({
            query: GET_CLIENTS
        });

        cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: [...clients, addClient] }
        })
    }
  });

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
    }))
  };

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !name || !phone) {
        alert('Please complete all the required fields.');
        return;
    }

    addClient({ variables: { name, email, phone }});
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
  }

  return (
    <>
        <div className="my-7">
            <button onClick={() => setIsModalOpen(true)} type="button" data-modal-toggle="authentication-modal" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
                Add Client
            </button>
        </div>
        {
            isModalOpen && (
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={`${!isModalOpen && 'hidden'} dimmed overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setIsModalOpen(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                            </button>
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add new client</h3>
                                <form className="space-y-6" onSubmit={(e) => onHandleSubmit(e)}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                                        <input onChange={(e) => onHandleChange(e)} value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name"  />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                        <input onChange={(e) => onHandleChange(e)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                                        <input onChange={(e) => onHandleChange(e)} type="text" value={phone} name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit new user</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}
export default ClientModalForm