# Stage 1: Build
FROM python:3.10 as build

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# Stage 2:  Runtime
FROM python:3.10-slim

WORKDIR /app

COPY --from=build /app/ .

EXPOSE 5000

ENTRYPOINT ["flask"]
CMD ["run", "--host=0.0.0.0"]