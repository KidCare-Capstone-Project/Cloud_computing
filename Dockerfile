FROM node:20
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=8080
ENV MODEL_URL="https://storage.googleapis.com/model-deploy-mlgc/model.json"
ENV BUCKET_NAME="kidcare-bucket"
ENV PROJECT_ID="kidcare-2024"
EXPOSE 8080

CMD [ "npm", "start" ]