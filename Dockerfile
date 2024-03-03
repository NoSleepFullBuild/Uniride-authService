# Étape de construction
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .env . 
COPY . .
RUN npm run build

# Étape de production
FROM node:14 AS production
WORKDIR /usr/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
COPY .env .  
RUN npm install --only=production
EXPOSE 3004
CMD ["node", "dist/index.js"]
