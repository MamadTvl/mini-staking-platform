# Mini Staking Platform

## Installation

Ensure you have Docker installed, or use your own PostgreSQL and Redis databases.

Install dependencies using Yarn:

```bash
yarn
```

## Running the App in Development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker Compose

To run the application using Docker, use the following commands:

```bash
docker compose up -d
```

If above command didn't work, build the Docker image, pull images, and start the containers:

```bash
docker compose build && docker compose pull && docker compose up -d
```

## Swagger / Postman

Access the Swagger documentation at: <http://localhost:3000/api/docs>.

For Postman users, download the OpenAPI JSON file and import it from: <http://localhost:3000/api/docs-json>.

## Admin Access

You can modify the default admin username and password using [environment variables](.env.example).

Default credentials:

```
username: admin
password: admin
```