# Stage 1: Build
FROM python:3.10 as build

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# Stage 2:  Runtime
FROM python:3.10-slim

WORKDIR /app

COPY --from=build /app/ .

EXPOSE 8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
