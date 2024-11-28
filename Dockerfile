# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copiar la build generada
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Agregar tini
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Crear un usuario no root
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

USER nodejs

EXPOSE 3000

CMD ["npm", "start"]

