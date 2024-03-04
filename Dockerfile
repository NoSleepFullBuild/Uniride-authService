FROM node:14

WORKDIR /usr/src/app
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3004

CMD ["node", "dist/index.js"]
