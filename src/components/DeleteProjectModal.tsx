import { useProjects } from "../stores/projects"

interface ReqProps {
  projectid: string
}

const DeleteProjectModal = ({projectid}:ReqProps) => {

  const {deleteProject} = useProjects();

  return (
    <>
      <div
        className="modal"
        id="deleteprojectmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-none">
              <h1
                className="modal-title fs-5 font-semibold"
                id="staticBackdropLabel"
              >
                Delete This Project?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="font-semibold">Warning: This can't be undone</p>
              <p className="text-lg">Are you sure you want to this delete this project?</p>
            </div>
            <div className="modal-footer border-none">
              <button
                type="button"
                className="rounded bg-slate-200 py-2 px-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <a
                className="rounded bg-red-500 py-2 px-3 text-slate-100 cursor-pointer"
                onClick={() => deleteProject(projectid)}
                href="/"
              >
                <span className="dropdown-item">Delete</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProjectModal