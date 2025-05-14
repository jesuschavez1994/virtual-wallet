# Usa una imagen base de Node.js
FROM node:18-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala todas las dependencias, incluidas las de desarrollo
RUN npm install --include=dev

# Verifica que react-scripts esté instalado
RUN npm list react-scripts

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto en el que corre el frontend
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]