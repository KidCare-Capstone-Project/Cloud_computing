FROM node:20
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=8080
ENV MODEL_URL="secret"
ENV BUCKET_NAME="secret"
ENV PROJECT_ID="secret"
EXPOSE 8080

CMD [ "npm", "start" ]