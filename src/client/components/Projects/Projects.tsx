import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../../queries/Project.query";
import Alert from "../Alert/Alert";

import Spinner from "../Spinner/Spinner";

interface ProjectType {
    projects: ProjectDataType[]
}

interface ProjectDataType {
    id: string,
    name: string,
    description: string,
    status: 'Not Started' | 'In Progress' | 'Completed'
}

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const navigate = useNavigate();
  let projects = data;

  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`, {replace: true});
  }

  const renderProjects = (data: ProjectType) => {
    return data?.projects?.map((project: ProjectDataType, index: number) => {
        return (
            <div key={index} className="flex justify-between p-3 border-2 border-[#8c899b] rounded shadow-inner transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100	">
                <div>
                    <h2 className="font-semibold text-2xl mb-2">{project.name}</h2>
                    <span className="text-lg">Status: <b>{project.status}</b></span>
                </div>
                <button type="button" onClick={() => handleViewProject(project.id)} className="text-gray-900 h-[45px] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
            </div>
        );
    });
  }

  if (loading) return <Spinner />
  if (error) return <Alert />

  return (
    <section className="mb-10">
        {
            !projects ? <h1 className="font-medium text-3xl text-center">There are no projects</h1> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{renderProjects(data)}</div>
        }
    </section>
  ) 
}
export default Projects