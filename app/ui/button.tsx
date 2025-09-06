import clsx from "clsx";
import { motion } from "motion/react";

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
    <motion.button
      className={clsx(
        "m-2 p-3 bg-green-950 rounded-2xl hover:bg-blue-950 hover:text-g hover:cursor-pointer border-solid border-1 border-gray-50 " +
          className,
        {
          "brightness-50 hover:cursor-not-allowed": disabled === true,
        }
      )}
      initial={{ scale: 1 }} // Initial state
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 0.95 }} // Scale down on tap/click
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation settings
      onClick={onClick}
      name={name}
      value={value}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
