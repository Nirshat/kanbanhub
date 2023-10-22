import { useMemo } from "react";
import { useProjects } from "../stores/projects";
import TasksStatus from "../components/TasksStatus";
import { Link } from "react-router-dom";
import ProjectModal from "../components/ProjectModal";

const Project = () => {
  const { open, projects, deleteProject } = useProjects();

  const handleProjects = useMemo(() => {
    const filterItems = projects.filter((project) => project.id == open);
    return filterItems[0];
  }, [projects]);

  return (
    <>
      <div className="rounded w-11/12 flex flex-col gap-8 py-12 m-auto min-h-screen lg:w-3/4">
        <div className="flex flex-row justify-between items-center">
          <span className="rounded text-xl text-slate-600 font-bold">
            {handleProjects.name}
          </span>
          <div className="dropdown">
            <button
              className="dropdown-toggle bg-slate-100 rounded border py-1 px-2 text-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </button>
            <ul className="dropdown-menu py-1">
              <Link to="/">
                <span className="dropdown-item">Back</span>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li
                className="cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#anakngmodal"
              >
                <span className="dropdown-item">Edit Title</span>
              </li>
              <Link to="/"
                onClick={() => deleteProject(handleProjects.id)}
                className="cursor-pointer"
              >
                <span className="dropdown-item">Delete this project</span>
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3 lg:gap-8">
          <TasksStatus
            projectid={handleProjects.id} // currently open na project
            todo={handleProjects.todo}
            inpro={handleProjects.inpro}
            done={handleProjects.done}
          />
        </div>
      </div>

      <ProjectModal projectid={handleProjects.id} title={handleProjects.name} />
    </>
  );
};

export default Project;
