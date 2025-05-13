import React from "react";
import ReactDOM from "react-dom";

type ToastProps = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
  duration?: number; // Duración en milisegundos
};

export const toast = ({ title, description, variant = "default", duration = 3000 }: ToastProps) => {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer) {
    console.error("No se encontró un contenedor para los toasts. Asegúrate de agregar un div con id 'toast-container' en tu HTML.");
    return;
  }

  const toastElement = document.createElement("div");
  toastElement.className = `toast ${variant === "destructive" ? "bg-red-500" : "bg-blue-500"} text-white p-4 rounded-lg shadow-lg flex items-start gap-2 animate-slide-in`;
  toastElement.innerHTML = `
    <div>
      <strong class="block font-bold">${title}</strong>
      <p class="text-sm">${description}</p>
    </div>
  `;

  toastContainer.appendChild(toastElement);

  // Elimina el toast después de la duración especificada
  setTimeout(() => {
    toastElement.classList.add("animate-slide-out");
    toastElement.addEventListener("animationend", () => {
      toastElement.remove();
    });
  }, duration);
};