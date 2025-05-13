import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-medium",
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-black",
        className
      )}
      {...props}
    />
  );
};