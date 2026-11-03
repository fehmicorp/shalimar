FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY app/package*.json ./
RUN npm clean install
COPY app/ .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ca-certificates curl 
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static
EXPOSE 3000
CMD [ "node server.js" ]