import React, { useState } from "react";
import clsx from "clsx";

type TabsProps = {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
};

type TabChildProps = {
  activeTab?: string;
  setActiveTab?: (value: string) => void;
};

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
  
    console.log("Current activeTab:", activeTab); // Verificar el estado actual
  
    return (
      <div className={clsx("tabs", className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabChildProps>(child)) {
            // Pasar las propiedades `activeTab` y `setActiveTab` a los hijos
            return React.cloneElement(child, { activeTab, setActiveTab });
          }
          return child;
        })}
      </div>
    );
  };

export const TabsList: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={clsx("flex space-x-2", className)}>{children}</div>
);

export const TabsTrigger: React.FC<{
    value: string;
    activeTab?: string;
    setActiveTab?: (value: string) => void;
    className?: string;
  }> = ({ value, activeTab, setActiveTab, className, children }) => {
    const isActive = activeTab === value;
  
    console.log("TabsTrigger props:", { value, activeTab, isActive }); // Depurar las props
  
    return (
      <button
        className={clsx(
          "px-4 py-2 rounded-md flex items-center",
          isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-black",
          className
        )}
        onClick={() => {
          console.log("Changing tab to:", value);
          setActiveTab?.(value); // Actualizar el estado
        }}
      >
        {children}
      </button>
    );
  };

export const TabsContent: React.FC<{
    value: string;
    activeTab?: string;
    className?: string;
  }> = ({ value, activeTab, className, children }) => {
    const isActive = activeTab === value;
    console.log('isActive', isActive)
    return isActive ? <div className={clsx("mt-4", className)}>{children}</div> : null;
  };