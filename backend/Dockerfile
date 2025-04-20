ARG NODE_VERSION=23.11.0
ARG NODE_ALPINE=3.21

FROM node:${NODE_VERSION}-alpine${NODE_ALPINE} AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production


FROM node:${NODE_VERSION}-alpine${NODE_ALPINE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


FROM node:${NODE_VERSION}-alpine${NODE_ALPINE} AS production
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/controllers ./controllers
COPY --from=builder --chown=nodejs:nodejs /app/models ./models
COPY --from=builder --chown=nodejs:nodejs /app/routes ./routes
COPY --from=builder --chown=nodejs:nodejs /app/*.js ./
COPY --from=builder --chown=nodejs:nodejs /app/.env ./
USER nodejs
EXPOSE 4000
CMD ["node", "index.js"]
