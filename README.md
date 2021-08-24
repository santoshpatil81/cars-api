# Cars api
REST api to retrieve information related to the fleet of cars via a web service API.

## Installations and Pre-requisites:
* MongoDB
* Docker
* NodeJS
  * Express (Web application framework)
  * mongoose (Object Data Modeling/ODM library for MongoDB)
  * body-parser (Parser for incoming request bodies)
  * cors (Express middleware to enable CORS )
  * swagger (Open source editor to design, define and document RESTful APIs)
  * chai (BDD/TDD assertion library)

Before you proceed clone the github repo.
```$ git clone https://github.com/santoshpatil81/cars-api.git ```

## App deployment and CI/CD
Refer https://github.com/santoshpatil81/cars-cicd.git for application deployment and CICD details.

## Run Application

#### Start MongoDB
```
$cd cars-api
# Create data directory for MongoDB database.
$mkdir /tmp/data
$mongod --dbpath /tmp/data
```
#### Start server
```
$cd cars-api
$npm install
$npm run start
```
The server runs on port 3200

Alternatively you can also use the *docker-compose* command to start the app using a single command
```$ docker-compose up```


## REST API documentation

The swagger docs for the rest api can be accessed by the link http://localhost:3200/docs

#### List of token endpoints

| Request|  Endpoint                    |  Description                         |
| ------ | ---------------------------- | ------------------------------------ |
| POST   | ​/api​/cars​/create          | Generates a new Car object           |
| GET    | /api​/cars​/                 | Get a list of Cars                   |
| GET    | /api​/car​/:name             | Get details of the Car               |
| DELETE | /api​/token​/:carId          | Delete the Car object                |

#### List of user endpoints

| Request|  Endpoint                    |  Description                         |
|--------|------------------------------|--------------------------------------|
| POST   | /api​/user​/register           | Creates a new user (Public API)      |
| POST   | /api​/user​/login              | Validates user & returns a JWT token(Public API)  |


## Testing instructions

Run the `Chai` base tests using the following commmand

`npm run test`

## Build instructions

Use the following command to build the repo and create a docker image.
``` docker build -t cars:0.1 .```

## TODO
* API Rate limiting
