import { Link } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import { useMemo } from "react";

interface Props {
  type: string;
  ddprops: string[];
}

const Dropdown = ({ type, ddprops }: Props) => {
  const { toggle, handleToggle } = useToggle();

  const items = useMemo(() => {
    if(ddprops.includes('Link')){
      const itemsCondition = ddprops.filter((d) => d != "Link");
      return itemsCondition;
    }
    else{
      return ddprops
    }
  }, [ddprops]);


  return (
    <>
      <div className="relative inline-block text-left">
        {type == "button" ? (
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full px-3 py-1 text-slate-700 border border-slate-400 bg-slate-100 rounded shadow-sm text-sm md:text-base"
              onClick={handleToggle}
            >
              Settings
            </button>
          </div>
        ) : type == "ellipsis" ? (
          <div className="rounded px-4 py-1 hover:bg-slate-200"  onClick={handleToggle}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        ) : null}

        <div
          className={
            toggle
              ? "origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg z-10"
              : "hidden"
          }
        >
          <div className="bg-white border rounded-lg shadow-xs">
            {ddprops.includes("Link") ? (
              <div>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b"
                >
                  Back
                </Link>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
