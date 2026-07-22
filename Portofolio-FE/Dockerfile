FROM node:alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:alpine AS build
WORKDIR /app
ARG BE_URL=http://localhost:8888
ENV BE_URL=${BE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8887
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 8887
CMD ["node", "server.js"]
