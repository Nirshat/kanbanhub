import { useMemo } from "react";
import AddProject from "../components/AddProject";
import NoProject from "../components/NoProject";
import { useProjects } from "../stores/projects";
import { useShowModal } from "../stores/showmodal";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  const { setOpen, projects } = useProjects();
  const { show, setShow } = useShowModal();

  // this will optimize the rendering of list
  const handleProjects = useMemo(() => {
    return projects;
  }, [projects]);

  return (
    <>
      <div className="w-11/12 lg:w-3/5 m-auto pt-20 pb-12">
        <div className="text-4xl font-bold">
          <span className="text-green-500">Kanban</span>
          <span className="text-slate-600">Hub</span>
        </div>
        <p className="text-sm">
          Navigating Agile Workflows with KanbanHub.
        </p>
      </div>

      <div className="flex flex-col gap-6 min-h-screen w-11/12 m-auto lg:w-3/5">

        {/* <hr className="border-slate-400" /> */}

        <div className="rounded">
          <span className="rounded text-xl font-semibold text-slate-600">
            Projects Boards
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {projects.length > 0 ? (
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {handleProjects.map((m, index) => (
                <Link to={`/project/${m.name.toLowerCase()}`} key={index}>
                  <div
                    className="rounded border bg-slate-100 p-4 flex flex-row justify-between items-center text-slate-600 text-lg"
                    onClick={() => setOpen(m.id)}
                  >
                    {m.name}
                    <i className="fa-solid fa-folder text-slate-500"></i>
                  </div>
                </Link>
              ))}
              <button
                className="hidden md:block rounded bg-slate-50 p-4 text-slate-400 text-lg hover:text-slate-500 hover:bg-slate-100 hover:font-semibold"
                onClick={() => setShow(true)}
              >
                <i className="fa-solid fa-plus"></i> Add New
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
              <NoProject/>
              <button
                className="hidden lg:block rounded bg-slate-50 p-4 text-slate-400 text-lg hover:text-slate-500 hover:bg-slate-100 hover:font-semibold"
                onClick={() => setShow(true)}
              >
                <i className="fa-solid fa-plus"></i> Add New
              </button>
            </div>
          )}

          <button
            className="rounded mt-3 md:hidden bg-green-500 text-slate-100 font-semibold py-4"
            onClick={() => setShow(true)}
          >
            <i className="fa-solid fa-plus"></i> Add New
          </button>
        </div>
      </div>

      {show === true ? <AddProject /> : null}
    </>
  );
};

export default ProjectsList;
