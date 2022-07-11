import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DELETE_PROJECT } from "../../mutations/ProjectMutation";
import { GET_PROJECTS, GET_SINGLE_PROJECT } from "../../queries/Project.query";
import Alert from "../Alert/Alert";
import Spinner from "../Spinner/Spinner";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: ''
  });

  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id }
  });

  if (loading) return <Spinner />
  if (error) return <Alert />

  const { project } = data;
  const { name, description, client, status } = project;

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteProject({ variables: { id } })
  }

  return (
    <section className="border-2 border-indigo-600 mt-7 rounded-md">
        <div className="w-full text-right my-5">
            <Link type="button" to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg width={50} height={35} fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                    <g><g><g id="Left"><g><path d="M576.6,285.6c-12,0-22.8,4.7-31,12.2l-0.1-0.1L361.8,466.1c-9.5,8.7-14.9,21-14.9,33.9s5.4,25.1,14.9,33.9l183.8,168.4l0.1-0.1c8.2,7.5,19,12.2,31,12.2c25.4,0,45.9-20.6,45.9-45.9c0-13.4-5.8-25.4-15-33.8l0.1-0.1L460.8,500l146.8-134.6l-0.1-0.1c9.2-8.4,15-20.3,15-33.7C622.5,306.2,601.9,285.6,576.6,285.6z M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,898.1c-219.5,0-398.1-178.6-398.1-398.1c0-219.5,178.6-398.1,398.1-398.1c219.5,0,398.1,178.6,398.1,398.1C898.1,719.5,719.5,898.1,500,898.1z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
                </svg>
                <span className="text-lg">Go Back</span>
            </Link>
        </div>
        <div className="mx-5">
            <h1 className="font-medium leading-tight text-5xl mt-0">{name}</h1>
            <p className="mb-5">{description}</p>
            <h2 className="font-medium leading-tight text-3xl mt-0">Project Status</h2>
            <span className="mb-5">{status}</span>
            <h2 className="font-medium leading-tight text-3xl mt-5">Client Information</h2>

            {
              client ? (
                <div className="w-full mt-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <svg className="w-5 h-5 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                        {client?.name}
                    </button>
                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                        {client?.email}
                    </button>
                    <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                        {client?.phone}
                    </button>
                </div>
              ) : 'No clients attached to this project'
            }

          <h2 className="font-medium leading-tight text-3xl mt-8 mb-2">Update Project Information</h2>
          <form className="space-y-6 mb-8" onSubmit={(e) => onHandleSubmit(e)}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input onChange={(e) => onHandleChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name"  />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <input onChange={(e) => onHandleChange(e)} type="description" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description"  />
            </div>
            <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="New" selected>Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
            </div>
            <button type="submit" className="w-[50] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        <div className="w-full flex justify-end mb-8">
          <button type="button" onClick={(e) => handleDelete(e)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 pr-1 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Project
          </button>
        </div>
        </div>
    </section>
  )
}
export default ProjectDetail