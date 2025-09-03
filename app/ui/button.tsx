import clsx from "clsx";

export default function Button({
  children,
  className,
  onClick,
  name = "",
  value = "",
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (...args: never) => unknown;
  name?: string;
  value?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={clsx(
        "m-2 p-3 bg-green-950 rounded-2xl hover:bg-blue-950 hover:text-g hover:cursor-pointer border-solid border-1 border-gray-50 " +
          className,
        {
          "brightness-50 hover:cursor-not-allowed": disabled === true,
        }
      )}
      onClick={onClick}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
}
