import { useInput } from "../hooks/useInputEvent";
import { useProjects } from "../stores/projects";
import { useTaskForm } from "../stores/taskform";
import { useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface TaskTypesProps {
  projectid: string;
  status: string;
}

const AddTask = ({ projectid, status }: TaskTypesProps) => {
  const { setCloses } = useTaskForm();
  const { setTodos, setInProgress, setDone } = useProjects();
  const { input, inputUpdater } = useInput();
  const handleInput = useCallback(
    (event: any) => {
      inputUpdater(event.target.value);
    },
    [input, inputUpdater]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSetTasks = useCallback(() => {
    if (status == "todos") {
      setTodos(projectid, uuidv4(), input);
    } else if (status == "inprogress") {
      setInProgress(projectid, uuidv4(), input);
    } else if (status == "done") {
      setDone(projectid, uuidv4(), input);
    }
    setCloses(status);
  }, [input]);

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
  }, []);

  return (
    <>
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
        <div className="rounded grid grid-cols-2">
          <div></div>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="rounded border bg-slate-200 p-1"
              onClick={() => setCloses(status)}
            >
              Cancel
            </button>
            {input.length > 0 ? (
              <button
                ref={buttonRef}
                className="rounded p-1 bg-green-500 text-slate-100"
                onClick={handleSetTasks}
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
    </>
  );
};

export default AddTask;
