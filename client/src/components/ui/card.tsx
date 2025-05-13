import React from "react";
import clsx from "clsx";

export const Card: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx("bg-white shadow-md rounded-lg p-4", className)}>{children}</div>
);

export const CardHeader: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx("mb-4", className)}>{children}</div>
);

export const CardTitle: React.FC<{ className?: string }> = ({ className, children }) => (
  <h2 className={clsx("text-lg font-bold", className)}>{children}</h2>
);

export const CardDescription: React.FC<{ className?: string }> = ({ className, children }) => (
  <p className={clsx("text-sm text-gray-600", className)}>{children}</p>
);

export const CardContent: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx("mb-4", className)}>{children}</div>
);

export const CardFooter: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx("mt-4", className)}>{children}</div>
);