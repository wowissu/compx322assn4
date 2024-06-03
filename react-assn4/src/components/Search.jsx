import Button from "./Button";
import { useMergeState } from "../composiable/useMergeState";

const defaultSearching = {
  name: "",
  description: "",
};

export default function Search(props) {
  const [searching, setSearching] = useMergeState(defaultSearching);

  function emitSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    props.onSubmit?.(searching);
  }

  return (
    <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
      <form className="space-y-4" onSubmit={emitSubmit}>
        <div className="-mx-2 md:items-center md:flex">
          {/* Event Input */}
          <div className="flex-1 px-2">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Event name
            </label>
            <input
              type="text"
              placeholder="Search event name"
              className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              value={searching.name}
              onChange={(e) => setSearching({ name: e.target.value })}
            />
          </div>

          {/* Description Input */}
          <div className="flex-1 px-2">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Description
            </label>
            <input
              type="text"
              name="startdate"
              className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              value={searching.description}
              onChange={(e) => setSearching({ description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex">
          <Button>Search</Button>
        </div>
      </form>
    </div>
  );
}
