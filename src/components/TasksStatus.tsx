import { useMemo, useCallback } from "react";
import { useTaskForm } from "../stores/taskform";
import AddTask from "./AddTask";
import Task from "./Task";
import EditTask from "./EditTask";

interface StatusProps {
  projectid: string;
  todo: {
    cid: string;
    task: string;
  }[];
  inpro: {
    cid: string;
    task: string;
  }[];
  done: {
    cid: string;
    task: string;
  }[];
}

const TasksStatus = ({ projectid, todo, inpro, done }: StatusProps) => {
  const { opens, setOpens } = useTaskForm();

  const handleOpenForm = useCallback(
    (key: string) => {
      setOpens(key);
    },
    [opens]
  );

  const memoTasks = useMemo(() => {
    return {
      todos: todo,
      inpros: inpro,
      dones: done,
    };
  }, [todo, inpro, done]);

  const taskstatuses = [
    { name: "To-Do", stat: "todos", tasks: memoTasks.todos },
    { name: "In Progress", stat: "inprogress", tasks: memoTasks.inpros },
    { name: "Done", stat: "done", tasks: memoTasks.dones },
  ];

  return (
    <>
      {taskstatuses.map((taskstatus, index) => (
        <div className="rounded flex flex-col gap-3" key={index}>
          <span className="font-semibold">{taskstatus.name}</span>

          {taskstatus.tasks.length > 0 ? (
            taskstatus.tasks.map((task, index) => {
              if (opens.includes(task.cid)) {
                return (
                  <EditTask
                    key={index}
                    projectid={projectid}
                    status={taskstatus.stat}
                    taskid={task.cid}
                    taskdescription={task.task}
                  />
                );
              } else {
                return (
                  <Task
                    key={index}
                    projectid={projectid}
                    status={taskstatus.stat}
                    taskid={task.cid}
                    taskdescription={task.task}
                    editform={handleOpenForm}
                  />
                );
              }
            })
          ) : (
            <div className="rounded text-slate-400"> No task found. </div>
          )}

          {opens.includes(taskstatus.stat) ? (
            <AddTask status={taskstatus.stat} projectid={projectid} />
          ) : (
            <button
              className="rounded bg-slate-50 text-start p-3 text-slate-400 hover:text-slate-700 hover:border hover:border-slate-400"
              onClick={() => handleOpenForm(taskstatus.stat)}
            >
              <i className="fa-solid fa-plus"></i> Add New
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default TasksStatus;
