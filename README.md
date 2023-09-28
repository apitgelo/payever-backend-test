## User Microservice

### Available endpoints
- GET /api/user/{userId}
  - Retrieving data from `https://reqres.in/api/users/{userId}`
- GET /api/user/{userId}/avatar
  - Retrieving avatar url from `https://reqres.in/api/users/{userId}`
  - Save avatar to base64 under `./assets/avatars`
  - WIP saving data to DB

### Unit tests coverage
- Avatar Service

### How to run the service
- Install dependencies:
  ```
  yarn install
  ```
- Run service in debug mode:
  ```
  yarn start:debug
  ```
- Run unit tests
  ```
  yarn test
  ```
