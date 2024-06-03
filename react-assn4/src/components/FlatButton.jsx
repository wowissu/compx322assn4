import cx from "classnames";

export default function FlatButton(props) {
  const textColor = props.textColor ?? "text-gray-500 dark:text-gray-300";

  return (
    <>
      <button
        onClick={props.onClick}
        className={cx(
          "px-1 py-1  transition-colors duration-200 rounded-lg hover:bg-gray-100",
          textColor,
          props.className
        )}
      >
        {props.children}
      </button>
    </>
  );
}
