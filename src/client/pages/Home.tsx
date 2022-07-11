import Client from "../components/Client/Client"
import ClientModalForm from "../components/ClientModalForm/ClientModalForm"
import ProjectModalForm from "../components/ProjectModalForm/ProjectModalForm"
import Projects from "../components/Projects/Projects"

const Home = () => {
  return (
    <>
        <div className="flex">
          <ClientModalForm />
          <ProjectModalForm />
        </div>
        <Projects />
        <hr></hr><br />
        <Client />
    </>
  )
}
export default Home