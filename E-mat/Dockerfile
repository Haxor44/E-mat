FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g npm@latest
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
#RUN npm run build

#FROM node:20-alpine AS runner
#WORKDIR /app
#ENV NODE_ENV production

#COPY --from=builder /app/public ./public
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD [ "npm","run","dev" ]