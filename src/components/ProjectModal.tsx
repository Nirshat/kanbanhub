import { useState, useRef, useEffect, useCallback } from "react";
import { useProjects } from "../stores/projects";

interface ProjectStates {
  projectid: string;
  title: string;
}

const ProjectModal = ({ projectid, title }: ProjectStates) => {
  const [input, inputUpdater] = useState(title);
  const { updateProjectTitle } = useProjects();

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

  const handleupdateProjectTitle = useCallback(() => {
    updateProjectTitle(projectid, input);
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
    <>
      <div
        className="modal"
        id="anakngmodal"
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
                Edit Project Title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="border-1 border-slate-500 w-full py-3 px-2 text-lg rounded"
              />
            </div>
            <div className="modal-footer border-none">
              <button
                type="button"
                className="rounded bg-slate-200 py-2 px-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {input.length > 0 ? (<button
                ref={buttonRef}
                type="button"
                className="rounded bg-green-500 py-2 px-3 text-slate-100"
                onClick={handleupdateProjectTitle}
                data-bs-dismiss="modal"
              >
                Save
              </button>) : (<button
                disabled
                type="button"
                className="rounded bg-slate-200 py-2 px-3 text-slate-400"
              >
                Save
              </button>)}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
