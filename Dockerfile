FROM node:14

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3004

CMD ["node", "dist/index.js"]
