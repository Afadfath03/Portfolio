FROM node:lts AS deps
WORKDIR /app
COPY package.json ./
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN npm install

FROM node:lts AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8888
RUN mkdir -p /app/data
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
VOLUME /app/data
EXPOSE 8888
CMD ["node", "server.js"]
