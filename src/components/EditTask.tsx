import { useState, useRef, useEffect, useCallback } from "react";
import { useTaskForm } from "../stores/taskform";
import { useProjects } from "../stores/projects";

interface TaskTypesProps {
  projectid: string;
  status: string;
  taskid: string;
  taskdescription: string;
}

const EditTask = ({
  projectid,
  status,
  taskid,
  taskdescription,
}: TaskTypesProps) => {
  const { updateTodo, updateInProgress, updateDone, moveInTodo, moveToWIP, moveToDone } = useProjects();
  const { setCloses } = useTaskForm();
  const [input, inputUpdater] = useState(taskdescription);
  const [selectedStatus, selectedStatusUpdater] = useState(status); // status

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = useCallback((event: any) => {
      inputUpdater(event.target.value);
    },[input, inputUpdater]);

  const handleSelect = useCallback((event:any) => {
    selectedStatusUpdater(event.target.value);
  }, [selectedStatus, selectedStatusUpdater]);

  const handleUpdateTask = useCallback(
    (id: string, stat:string, newStat:string) => {
      if (stat == "todos") {
        updateTodo(projectid, id, input);
        if(newStat == 'inprogress'){ // transfer in in-progress
          moveToWIP(projectid, stat, id,input);
        }
        else if(newStat == 'done'){ // transfer in done
          moveToDone(projectid, stat, id,input);
        } 
      }
      else if (stat == "inprogress") {
        updateInProgress(projectid, id, input);
        if(newStat == 'todos'){ // transfer in todo
          moveInTodo(projectid, stat, id,input);
        }
        else if(newStat == 'done'){ // transfer in done
          moveToDone(projectid, stat, id,input);
        } 
      }
      else if (stat == "done") {
        updateDone(projectid, id, input);
        if(newStat == 'todos'){ // transfer in todo
          moveInTodo(projectid, stat, id,input);
        }
        else if(newStat == 'inprogress'){ // transfer in in-progress
          moveToWIP(projectid, stat, id,input);
        }
      }
      setCloses(id);
    },
    [input, updateTodo, updateInProgress, updateDone]
  );


  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleKeyPress = (event:KeyboardEvent) => {
    if (event.key === "Enter") {
      buttonRef.current?.click();
    }
  };
  useEffect(() => {
    // Add an event listener to the document to listen for key presses
    document.addEventListener("keydown", handleKeyPress);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  },[]);

  return (
    <div className="rounded p-2 flex flex-col gap-2 border bg-slate-50">
      <div className="flex flex-col">
        <span className="rounded text-sm text-slate-600 font-semibold">
          Task
        </span>
        <input
          ref={inputRef}
          type="text"
          maxLength={50}
          value={input}
          onChange={handleInput}
          className="p-2 rounded border border-slate-300 text-slate-800 bg-slate-100"
        />
      </div>
      <div className="flex flex-col">
        <span className="rounded text-sm text-slate-600 font-semibold">
          Status
        </span>
        <select
          className="p-2 rounded border border-slate-300 text-slate-800 bg-slate-100"
          value={selectedStatus}
          onChange={handleSelect}
        >
          <option value="todos">To-Do</option>
          <option value="inprogress">In-Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="rounded grid grid-cols-2">
        <div></div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="rounded border bg-slate-200 p-1"
            onClick={() => setCloses(taskid)}
          >
            Cancel
          </button>
          {input.length > 0 ? (
            <button
              ref={buttonRef}
              className="rounded p-1 bg-green-500 text-slate-100"
              onClick={() => handleUpdateTask(taskid, status,selectedStatus)}
            >
              Save
            </button>
          ) : (
            <button
              disabled
              className="rounded p-1 bg-slate-200 text-slate-400"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTask;
