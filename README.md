# Cars api
REST api to retrieve information related to the fleet of cars via a web service API.

## Installations and Pre-requisites:
* MongoDB
* NodeJS

Before you proceed clone the github repo.
```$ git clone https://github.com/santoshpatil81/cars-api.git ```

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


## TODO
* API Rate limiting


