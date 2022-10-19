# NestJS + Mongoose + MongoDB Starter Template

This is a template for a simple To Do List web app that consists of a REST API and a simple front end UI.

<p align="center"><img src="screenshot.png" width="90%" /></p>

The app uses [NextJS](https://nextjs.com) as the foundation that provides the REST API back end and also serves the static front end.
[Mongoose](https://mongoosejs.com) is used to define the data model and interfaces to the [MongoDB](https://mongodb.com) database.

## Using this Starter Template

This repo can be used as an [Adaptable.io](https://adaptable.io) Starter.
For instructions on using this repo as a template and deploying to the Adaptable Cloud in just a few clicks, check out the [Starter Guide](https://adaptable.io/docs/starters/nestjs-mongo-starter).

## Running a local dev environment

All of the following instructions assume you are in the repo root directory.

### 1. Install Node.js modules

```console
yarn
```

### 2. Run MongoDB locally

The app requires a database to store the data for the REST API.
You can run a MongoDB cluster on your local development system if you have Docker installed.

To run a MongoDB cluster using Docker:

```console
yarn run mongo-start
```

To later stop the MongoDB cluster:

> **WARNING**: All data stored in the local cluster will be deleted when the container is stopped.
> For information on persisting the database data, see [the MongoDB Docker README](https://github.com/docker-library/docs/blob/master/mongo/README.md#where-to-store-data).

```console
yarn run mongo-stop
```

### 3. Start the app (watch mode)

```console
yarn run start:dev
```

> **NOTE**: By default, the app listens on port 3000. To use a different port, set the `PORT` environment variable to the desired port number.

### 4. Connect to your app

Use a web browser to connect to [http://localhost:3000](http://localhost:3000)

## Running in production

### 1. Set DATABASE_URL

The app uses the environment variable `DATABASE_URL` to connect to your MongoDB instance.
Ensure that `DATABASE_URL` is set to the URL for your MongoDB cluster.

### 2. Build

```console
yarn run build
```

### 3. Run

```console
yarn run start
```

## Testing

```console
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## Source Code

### REST API (back end)

This project follows the NestJS conventions for file and directory structure.
The implementation of the `/todos` REST API endpoint can be found in `src/todoitems/`.

### Web UI (front end)

The layout and static portions of the front end can be found in `public/index.html`
The dynamic part of the front end is in `public/js/client.js`.

<p align="center"><a href="https://adaptable.io"><img src="https://adaptable.io/img/color lockup.svg" height="50px" alt="Adaptable.io" /></a></p>
