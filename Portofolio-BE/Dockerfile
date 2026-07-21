FROM node:alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache python3 make g++
RUN npm ci

FROM node:alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:alpine AS run
WORKDIR /app
ENV NODE_ENV=production
RUN mkdir -p /app/data
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
VOLUME /app/data
EXPOSE 3000
CMD ["node", "server.js"]
