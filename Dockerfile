FROM node:18-alpine
COPY . .
RUN npm install
RUN cp .ci.env .env
CMD [ "npm", "start" ]
EXPOSE 5000