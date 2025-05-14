FROM node:18

WORKDIR /app

COPY package*.json ./

# Instala dependencias (incluyendo devDependencies)
RUN npm install --include=dev

COPY . .

EXPOSE 8080

CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts", "--exec", "ts-node", "src/app.ts"]