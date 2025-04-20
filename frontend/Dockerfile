ARG NODE_VERSION=23.11.0
ARG NODE_ALPINE=3.21
ARG NGINX_VERSION=1.26.3
ARG NGINX_ALPINE=3.20

FROM node:${NODE_VERSION}-alpine${NODE_ALPINE} AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps


FROM node:${NODE_VERSION}-alpine${NODE_ALPINE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM nginx:${NGINX_VERSION}-alpine${NGINX_ALPINE}-perl AS production
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
