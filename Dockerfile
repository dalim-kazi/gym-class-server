## build image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY . .
RUN npm run build

## Final production image
FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /usr/src/app/build ./build
COPY .env .env

EXPOSE 4103

CMD ["node", "build/server.js"]