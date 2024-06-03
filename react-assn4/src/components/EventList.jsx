import dayjs from "dayjs";
import IconTrash from "./icons/IconTrash";
import FlatButton from "./FlatButton";
import { EndDateColumn, StartDateColumn } from "../event.store";
import useSorting from "../composiable/useSorting";
import IconArrowDown from "./icons/IconArrowDown";
import IconArrowUp from "./icons/IconArrowUp";
import IconSort from "./icons/IconSort";

export default function EventList(props) {
  const [sorting, { setSorting }] = useSorting();

  /**
   * Formats a date string.
   *
   * @param {string} date - The date string to format.
   * @returns {string} - The formatted date.
   */
  function dateFormat(date) {
    return dayjs(date).format("DD MMM YYYY");
  }

  /**
   * Formats a time string.
   *
   * @param {string} time - The time string to format.
   * @returns {string} - The formatted time.
   */
  function timeFormat(time) {
    return dayjs(time).format("HH:mm");
  }

  /**
   * Emits the delete event.
   *
   * @param {Object} event - The event to delete.
   */
  function emitDelete(event) {
    props.onDelete(event);
  }

  /**
   * Emits the sort event.
   *
   * @param {string} column - The column to sort by.
   */
  function emitSort(column) {
    let newSorting = Object.assign({}, sorting);

    if (column !== sorting.column) {
      newSorting.column = column;
      newSorting.sort = -1;
    } else if (sorting.sort === -1) {
      newSorting.sort = 1;
    } else {
      newSorting = { column: null, sort: 0 };
    }

    setSorting(newSorting);
    props.onSort?.(newSorting);
  }

  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {/* Columns */}
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="pl-12 pr-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <span>ID</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <span>Name / Description</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                    >
                      <FlatButton
                        onClick={() => emitSort(StartDateColumn)}
                        textColor={
                          sorting.column === StartDateColumn
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      >
                        StartDate
                        <span>
                          {sorting.column !== StartDateColumn ? (
                            <IconSort />
                          ) : sorting.sort === 1 ? (
                            <IconArrowDown />
                          ) : (
                            <IconArrowUp />
                          )}
                        </span>
                      </FlatButton>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <FlatButton
                        onClick={() => emitSort(EndDateColumn)}
                        textColor={
                          sorting.column === EndDateColumn
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      >
                        EndDate
                        <span>
                          {sorting.column !== EndDateColumn ? (
                            <IconSort />
                          ) : sorting.sort === 1 ? (
                            <IconArrowDown />
                          ) : (
                            <IconArrowUp />
                          )}
                        </span>
                      </FlatButton>
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      {/* <span>Edit</span> */}
                    </th>
                  </tr>
                </thead>
                {/* TableBody */}
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {props.data.map((event) => (
                    <tr key={event.id}>
                      <td className="pl-12 pr-4 py-4 text-sm whitespace-nowrap">
                        #{event.id}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            {event.name}
                          </h2>

                          <p className="text-gray-500 dark:text-gray-400 cursor-pointer text-wrap">
                            {event.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {dateFormat(event.startdate)}{" "}
                        <span className="text-blue-600">
                          {timeFormat(event.startdate)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {dateFormat(event.enddate)}{" "}
                        <span className="text-blue-600">
                          {timeFormat(event.enddate)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <FlatButton onClick={() => emitDelete(event)}>
                          <IconTrash />
                        </FlatButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
