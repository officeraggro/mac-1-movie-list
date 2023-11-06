FROM node:alpine

WORKDIR /app

COPY . /app

EXPOSE 3000

RUN npm install
RUN cd src

CMD ["npm", "start"]