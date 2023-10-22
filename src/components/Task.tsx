import { useProjects } from "../stores/projects";
import { useTaskForm } from "../stores/taskform";
import { useCallback } from "react";

// from TaskTypes component
interface TaskProps {
  projectid: string;
  status: string;
  taskid: string;
  taskdescription: string;
  editform: (taskid: string) => void;
}

const Task = ({ projectid, status, taskid, taskdescription, editform }: TaskProps) => {
  const { deleteTodo, deleteInProgress, deleteDone } = useProjects();
  const { opens } = useTaskForm();

  const handleOpenForm = useCallback(() => {
    editform(taskid);
  }, [opens]);

  const handleDeleteTask = useCallback((type:string, id:string) => {
    if(type == "todos"){
      deleteTodo(projectid, id);
    } else if (type == "inprogress"){
        deleteInProgress(projectid, id);
      } else if (type == "done"){
          deleteDone(projectid, id);
        }
  }, []);

  return (
    <div className="rounded bg-slate-100 p-3 text-slate-700 flex flex-row justify-between items-center">
      <p className="rounded">
        {taskdescription}
      </p>

      <div className="dropdown">
        <div
          className="dropdown rounded px-3 hover:bg-slate-200"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <ul className="dropdown-menu py-1">
          <li onClick={handleOpenForm} className="cursor-pointer">
            <span className="dropdown-item py-2">Edit</span>
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleDeleteTask(status, taskid)}
          >
            <span className="dropdown-item py-2">Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Task;
