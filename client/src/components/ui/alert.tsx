import React from "react";
import clsx from "clsx";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning";
}

export const Alert: React.FC<AlertProps> = ({ variant = "default", className, children, ...props }) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-md border",
        variant === "default" && "bg-gray-50 text-gray-800 border-gray-300",
        variant === "success" && "bg-green-50 text-green-800 border-green-300",
        variant === "error" && "bg-red-50 text-red-800 border-red-300",
        variant === "warning" && "bg-yellow-50 text-yellow-800 border-yellow-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ className, children, ...props }) => {
  return (
    <p className={clsx("text-sm", className)} {...props}>
      {children}
    </p>
  );
};