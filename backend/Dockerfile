# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Development ----
FROM base AS dev
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# ---- Builder ----
FROM base AS builder
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ---- Production ----
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist
# Include db/ and tsconfig files if running TypeORM CLI migrations at startup
COPY --from=builder /app/db ./db
COPY --from=builder /app/tsconfig*.json ./

EXPOSE 3001
CMD ["npm", "run", "start:prod"]