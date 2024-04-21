# siena-backend-challenge

Siena's challenge for the Senior Backend Engineer position

This project used Node.js + Express.js.
It also used [LocalStack](https://www.localstack.cloud/) to simulate AWS cloud locally and Postgress as database.

**!!! The Prompt Engineering details are located on** `./PROMPT_ENGINEERING.md`.

### Requirements

1. You need to have [Docker and Docker-compose](https://docs.docker.com/get-docker/) installed.

2. You need [Node](https://nodejs.org/en/download) and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) installed.

### Setup project

1. Bring project dependencies up with docker-compose.
```shell
docker compose up -d

# the project uses Localstack to run AWS services locally
# It also uses a Postgrees image
```

2. Install dependencies with Yarn and run database migrations and seeds.
```shell
yarn setup

# this will run yarn install and the migrations command.
```

3. Copy `.env.example` file to `.env`.

### Running Project

1. To run the project build.
```shell
yarn start

# this script will create the build and run it
```

2. To run the project with file watch (for development).
```shell
yarn dev
```

If everithing went well, the terminal should look like this:
![terminal](./assets/screenshots/Screenshot%20from%202024-04-21%2013-34-43.png)

### Usage

The repository alredy have everithing necessary to run some manual tests.

You can find a CSV sample file on `./assets/smallCsvSample.csv`.

1. To test the `/upload` endpoint you can use the following Curl command or use the Postman / Insomnia collection located at `./docs/siena-collection.json`.
```shell
curl --request POST \
  --url http://localhost:5000/upload \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/8.6.1' \
  --form file={PATH}/siena-backend-challenge/assets/smallCsvSample.csv

# use the example csv provided
# you can check the uploaded file on Localstck's S3 using the awslocal cli
```

2. To test the `/conversation` endpoint (after the upload of the sample csv file) you can run the following Curl command.
```shell
curl --request GET \
  --url 'http://localhost:5000/conversation?limit=1&skip=0' \

# change the pagination parameters as needed
```

3. To test the `/conversation/:id/message` endpoint, you can run the following Curl command.
Use the above endpoint to get a `conversation` ID.
```shell
curl --request GET \
  --url http://localhost:5000/conversation/{some-id}/message \
```

### Data Structure

To model the databade tables I've used `TypeOrm` and `Postgrees`.

The tables details can be viewed bellow.
![tables](./assets//screenshots//Screenshot%20from%202024-04-21%2002-35-29.png)

### Running the unit tests

To run the unit tests, just run the following command:
```shell
yarn test
```
