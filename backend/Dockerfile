FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine AS run
WORKDIR /app
ENV NODE_ENV=production
RUN mkdir -p /app/data
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
VOLUME /app/data
EXPOSE 8889
CMD ["node", "dist/index.js"]
