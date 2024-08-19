FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
