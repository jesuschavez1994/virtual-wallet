import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-medium",
        variant === "primary"
          ? "bg-blue-500 text-white"
          : variant === "secondary"
          ? "bg-gray-200 text-black"
          : "border border-gray-500 text-gray-500", // Estilo para "outline"
        className
      )}
      {...props}
    />
  );
};