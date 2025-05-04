FROM node:16-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

CMD ["npm", "start"]