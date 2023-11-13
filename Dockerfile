FROM node:14.21.3-alpine
WORKDIR /app
COPY ./main.js ./main.js 
COPY ./package.json ./package.json
RUN npm install --omit=dev

EXPOSE 3000
CMD [ "npm", "start" ]

