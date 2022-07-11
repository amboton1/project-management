import { ADD_PROJECT } from "../../mutations/ProjectMutation";
import { ChangeEvent, FormEvent, useState } from "react"
import { GET_PROJECTS } from "../../queries/Project.query";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/Client.query";
import { ClientsType } from "../Client/Client";

const ProjectModalForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'NEW',
        clientId: ''
    });

    const { name, description, status, clientId } = formData;

    const { error, data } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
      variables: { name, description, status, clientId },
      update(cache, { data: { addProject } }) {
          const { projects }: Record<string, string>[] | any = cache.readQuery({
              query: GET_PROJECTS
          });
  
          cache.writeQuery({
              query: GET_PROJECTS,
              data: { projects: [...projects, addProject] }
          })
      }
    });

    const renderClients = (data: ClientsType) => {
        return !error && data.clients.map(client => {
            return (
                <option key={client.id} value={client.id}>{client.name}</option>
            )
        });
    }

    const onHandleChange = (event: ChangeEvent<any>) => {
      setFormData((prevState: any) => ({
          ...prevState,
          [event.target.name]: event.target.value,
      }))
      console.log(formData)
    };

    const onHandleSubmit = (event: FormEvent) => {
      event.preventDefault();
  
      if (!description || !name || !status || !clientId) {
          alert('Please complete all the required fields.');
          return;
      }

      console.log(name, description, status, clientId)

      addProject({variables: { name, description, status, clientId } });
      setIsModalOpen(false);
      //setFormData({ name: '', description: '', status: '', clientId: '' });
    }
  
    return (
      <>
          <div className="my-7">
              <button type="button" onClick={() => setIsModalOpen(true)} className="text-white bg-[#CB3795] hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
                  New Project
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
                                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add new project</h3>
                                  <form className="space-y-6" onSubmit={(e) => onHandleSubmit(e)}>
                                      <div>
                                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project name</label>
                                          <input onChange={(e) => onHandleChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name"  />
                                      </div>
                                      <div>
                                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                                          <textarea onChange={(e) => onHandleChange(e)} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description"  />
                                      </div>
                                      <div>
                                          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                          <select id="status" name="status" onChange={(e) => onHandleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option defaultValue={status} selected>Choose a status</option>
                                            <option value="NEW">New</option>
                                            <option value="PROGRESS">In Progress</option>
                                            <option value="COMPLETED">Completed</option>
                                          </select>
                                      </div>
                                      <div>
                                          <label htmlFor="clientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client</label>
                                          <select id="clientId" name="clientId" onChange={(e) => onHandleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value=''>Choose a Client</option>
                                            {renderClients(data)}
                                          </select>
                                      </div>
                                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit new project</button>
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
export default ProjectModalForm
