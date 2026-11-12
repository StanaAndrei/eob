FROM node:20-alpine

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copy application source
COPY . .

EXPOSE 5173

# --host 0.0.0.0 ensures Vite/dev server binds outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]