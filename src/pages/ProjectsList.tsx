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
      <div className="flex flex-col gap-6 min-h-screen justify-center w-11/12 m-auto py-12 lg:w-3/5">
        <div className="rounded flex flex-row justify-between items-center">
          <span className="rounded text-2xl font-semibold">
            Projects Boards
          </span>
          <button
            className="hidden md:block rounded bg-green-500 text-slate-50 py-2 px-3"
            onClick={() => setShow(true)}
          >
            <i className="fa-solid fa-plus"></i> Add New
          </button>
        </div>

        {/* <hr className="border-slate-400" /> */}

        <div className="flex flex-col gap-3">
          {projects.length > 0 ? (
            handleProjects.map((m, index) => (
              <Link to={`/project/${m.name.toLowerCase()}`} key={index}>
                <div
                  className="rounded border bg-slate-100 p-4 flex flex-row justify-between items-center text-slate-600 text-lg"
                  onClick={() => setOpen(m.id)}
                >
                  {m.name}
                  <i className="fa-solid fa-folder text-slate-500"></i>
                </div>
              </Link>
            ))
          ) : (
            <NoProject />
          )}

          <button
            className="rounded md:hidden bg-green-500 text-slate-100 font-semibold py-3"
            onClick={() => setShow(true)}
          >
            Add New
          </button>
        </div>
      </div>

      {show === true ? <AddProject /> : null}
    </>
  );
};

export default ProjectsList;
