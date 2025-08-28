export default function Button({
  children,
  className,
  onClick,
  name = "",
  value = "",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (...args: never) => unknown;
  name?: string;
  value?: string;
}) {
  return (
    <button
      className={
        "m-2 p-3 bg-green-950 rounded-2xl hover:bg-blue-950 hover:text-g hover:cursor-pointer border-solid border-1 border-gray-50 " +
        className
      }
      onClick={onClick}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
}
