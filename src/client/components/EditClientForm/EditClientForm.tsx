import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { UPDATE_PROJECT } from "../../mutations/ProjectMutation";
import { GET_SINGLE_PROJECT } from "../../queries/Project.query";

interface EditFormType {
    project: {
        id: '',
        name: '',
        description: '',
        status: ''
    }
}

const EditClientForm = ({ project }: EditFormType) => {    
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        status: ''
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name: formData.name, description: formData.description, status: formData.status },
        refetchQueries: [{ query: GET_SINGLE_PROJECT, variables: { id: project.id } }]
    });

    const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }))        
    }

    const onHandleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        if (!formData.name || !formData.description || !formData.status) {
            return alert('Please complete all the required fields!');
        }

        updateProject({ variables: { id: project.id, name: formData.name, description: formData.description, status: formData.status } })
    }

    return (
        <>
          <h2 className="font-medium leading-tight text-3xl mt-8 mb-2">Update Project Information</h2>
          <form className="space-y-6 mb-8" onSubmit={(e) => onHandleSubmit(e)}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input value={formData.name} onChange={(e) => onHandleChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="First Name"  />
            </div>
            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <input value={formData.description} onChange={(e) => onHandleChange(e)} type="description" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description"  />
            </div>
            <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                <select id="status" defaultValue={project.status} name="status" onChange={(e) => onHandleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="NEW">Not Started</option>
                  <option value="PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <button type="submit" className="w-[50] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </>
    )
}

export default EditClientForm;