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
  * chai/mocha (BDD/TDD assertion library)

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

![image](https://user-images.githubusercontent.com/11945086/130646521-a95de892-378e-457a-90c7-e7b163788648.png)


#### List of token endpoints

| Request|  Endpoint                    |  Description                         |
| ------ | ---------------------------- | ------------------------------------ |
| POST   | ​/api​/cars​/create          | Generates a new Car object           |
| GET    | /api​/cars​/                 | Get a list of Cars                   |
| GET    | /api​/car​/:name             | Get details of the Car               |
| DELETE | /api​/token​/:carId          | Delete the Car object                |

##### POST ​/api​/cars​/create 

![image](https://user-images.githubusercontent.com/11945086/130646774-cd7c3b70-77ab-43bb-afba-a162240bd80a.png)

##### GET ​/api​/cars 

![image](https://user-images.githubusercontent.com/11945086/130646805-4ad8b03e-19b2-4d8a-b73f-18d041d86bc4.png)

##### GET ​/api​/car​/:name 

![image](https://user-images.githubusercontent.com/11945086/130646866-5e48407a-9604-4b69-93af-530a684e23a0.png)

#### List of user endpoints

| Request|  Endpoint                    |  Description                         |
|--------|------------------------------|--------------------------------------|
| POST   | /api​/user​/register           | Creates a new user (Public API)      |
| POST   | /api​/user​/login              | Validates user & returns a JWT token(Public API)  |


## Testing instructions

Run the `Chai` base tests using the following commmand

`npm run test`

The following output is to be expected

```
  Integration test
    Test get car details and list
      ✔ Creating a new admin user using POST /api/user/register works. (144ms)
      ✔ Login using the admin user using POST /api/user/login works. (84ms)
      ✔ Creating a new Car using POST /api/car/create works.
      ✔ Fetching Car details using GET /api/car/:name works.
      ✔ Fetching Car details using GET /api/car/:name does not work without JWT Token. Expected to return 403 status code (Forbidden)
      ✔ Creating one more Car using POST /api/car/create works.
      ✔ Fetching Car details #2 using GET /api/car/:name works.
      ✔ Getting the Car list using GET /api/cars works
      ✔ Deleting the car 1 using DELETE /api/car/:carId works
      ✔ Deleting the car 2 using DELETE /api/car/:carId works
      ✔ Deleting an admin user works


  11 passing (4s)
  0 failing
 ```
 
## Build instructions

Use the following command to build the repo and create a docker image.
``` docker build -t cars:0.1 .```

## TODO
* API Rate limiting
