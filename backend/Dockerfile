FROM node:20-alpine

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copy application source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]