# Fullstack Student CRUD Application

This is a basic student CRUD application, where you can create, read, update and delete students.

A student is an entity with the following attributes: *firstName*, *lastName*, *birthDate*, *hobbies* and *photo*.

Technologies used:
- NodeJS
- React
- GraphQL
- MySQL
- Redux
- Redux-Saga
- CSS modules
- Flow
- Docker (docker-compose)
- Jest
- Enzyme
- Mocha
- Sinon
- Eslint

## Getting Started

The easiest way to start this application locally is by running its Docker containers with the [docker-compose](https://docs.docker.com/compose/install/) tool.

Notice that `docker-compose` requires the **Docker Engine** in order to work. To install **Docker**, check [here](https://docs.docker.com/install/#server).

With `docker-compose`, all you need to do is run the following command on the root project directory:
```
docker-compose up
```

And voilà! The **client** application will be running on [http://localhost:3000](http://localhost:3000) and the **server** application on [http://localhost:4000](http://localhost:4000).

## Alternatives for running locally

You can also start each project with the `npm start` command. Notice that, by doing this, you will need to set up the database on your own. This server application is ready to connect to a [MySQL](https://www.mysql.com/) database (tested with the MySQL 5.7 Docker image). In order to set up the connection manually, you will need to set the following environment variables when running the server application:

```
DB_HOST = 'mysql' // The hostname where your database sits. Default is 'mysql' due to the docker-compose database service name
DB_PORT = 3306 // The database connection port. Default MySQL port is 3306
DB_USER = 'dev' // The user that will be used to start connections
DB_PASSWORD = 'dev' // The user password
DB_DATABASE = 'dev' // The database name that we will connect to
```

By doing so, the server application will try to connect to the database using this configuration.

## Database initialization

When running the applications using docker-compose, it will run the instructions from `<REPO_DIR>/mysql/init-dev/init.sql`. This will guarantee that the Student table will be created and some entries will be added. During the first initialization, the MySQL database will take a little longer to start. If you start using the server application as soon as it gets ready, maybe you can run it with the database on a loading state. That eventually will break the server application. But don't worry, the server will restart automatically as soon as possible.

## Docker volumes

A volume will be created for the MySQL database on `<REPO_DIR>/mysql/volume:/var/lib/mysql`.