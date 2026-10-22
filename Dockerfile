FROM node:20-alpine

WORKDIR /app

# copy package files first so docker can cache the npm install layer
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
