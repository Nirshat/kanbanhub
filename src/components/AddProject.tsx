import { useInput } from "../hooks/useInputEvent";
import { useProjects } from "../stores/projects";
import { useShowModal } from "../stores/showmodal";
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface ProjectPropertiesTypes {
  id: string;
  name: string;
  todo: { cid: string; task: string }[];
  inpro: { cid: string; task: string }[];
  done: { cid: string; task: string }[];
}

const AddProject = () => {
  const { setShow } = useShowModal();
  const { input, inputUpdater } = useInput();
  const { setProjects } = useProjects();

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = useCallback(
    (event: any) => {
      inputUpdater(event.target.value);
    },
    [input, inputUpdater]
  );

  const projectPropts: ProjectPropertiesTypes = {
    id: uuidv4(),
    name: input,
    todo: [],
    inpro: [],
    done: [],
  };

  const handleAddProject = useCallback(() => {
    if (input.length > 0) {
      setProjects(projectPropts);
      setShow(false);
    }
  }, [input]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleKeyPress = (event: KeyboardEvent) => {
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
    <div className="fixed bg-slate-100 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto py-4 px-6 flex flex-col gap-8">
        <div className="modal-content text-left flex flex-col gap-8">
          <h1 className="text-xl font-semibold">Add New Project</h1>
          <input
            ref={inputRef}
            className="border rounded px-2 py-3 text-lg"
            type="text"
            maxLength={30}
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="modal-footer flex flex-row justify-end gap-2">
          <button
            className="modal-close px-6 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          {input.length > 0 ? (
            <button
              ref={buttonRef}
              className="rounded bg-green-500 text-slate-50 py-2 px-3"
              onClick={handleAddProject}
            >
              Save Project
            </button>
          ) : (
            <button
              disabled
              className="rounded bg-slate-200 text-slate-400 py-2 px-3"
            >
              Save Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProject;
