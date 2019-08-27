[![License Badge](https://img.shields.io/badge/license-ISC-9cf.svg)](https://opensource.org/licenses/MIT)
[![License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Code Quality](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/ODINAKACHUKWU/SendIT.svg?branch=develop)](https://travis-ci.org/ODINAKACHUKWU/SendIT)
[![Coverage Status](https://coveralls.io/repos/github/ODINAKACHUKWU/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/ODINAKACHUKWU/SendIT?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0af4f56620958ae7224a/maintainability)](https://codeclimate.com/github/ODINAKACHUKWU/SendIT/maintainability)

# SendIT API

This is SendIT API built with [NodeJS](https://nodejs.org/). 

## Table of Contents

- [About SendIT](#About-SendIT "Goto About-SendIT")
- [Features](#Features "Goto Features")
- [Getting Started](#Getting-Started "Goto Getting-Started")
  - [Technology Stack](#Technology-Stack "Goto Technology-Stack")
  - [Prerequisites](#Prerequisites "Goto Prerequisites")
  - [Installation](#Installation "Goto Installation")
- [Usage](#Usage "Goto Usage")
- [Testing](#Testing "Goto Testing")
- [Questions](#Questions "Goto Questions")
- [Support or Contributions](#Support-or-Contributions "Goto Support-or-Contributions")
- [Link to the deployed application](#Link-to-the-deployed-application "Goto Link to the deployed application")
- [License](#License "Goto License")

## About SendIT

SendIT is a courier service that helps users deliver parcels to different destinations. It provides courier quotes based on weight categories.

## Features

- Users can create an account.
- Users can log in.
- Users can create a parcel delivery order.
- Users can see all their parcel delivery orders.
- Users can change the destination of a parcel delivery order.
- Users can cancel a parcel delivery order.
- Users can see the details of a parcel delivery order.
- Admin can change the status of a parcel delivery order.
- Admin can change the location of a parcel delivery order.
- Super admin can assign an admin role to a user and vice versa.

## Getting Started

The client folder in this project contains a UI built with HTML and CSS that consumes the API using vanilla javascript. However, to consume the API, you will need a frontend application.

### Technology Stack

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org)

### Prerequisites

Prior to cloning this repository, you should have node, npm and PostgreSQL installed on your machine.

- To verify the installation of node, run the command:
```
$ nodejs --version
```
```
Output
# Subject to version installed

v10.15.0
```
- To be able to download npm packages, you also need to install npm, the Node.js package manager. Verify npm installation by running the command:

```
$ npm --version
```
```
Output:
# Subject to version installed

6.10.2
```
- Verify the installation of PostgreSQL with any of the commands:
```
$ psql --version
$ postgres --version
```
```
Output:
# Subject to version installed

postgres (PostgreSQL) 11.2
```

### Installation

Step 1. Clone the repository
```
git clone https://github.com/ODINAKACHUKWU/SendIT.git
```
Step 2. Change directory into the root of the project directory
```
cd SendIT
```
Step 3. Install project dependecies
```
npm install
```
Step 4. Setup database
- You wll find an `.env.sample` file in the root directory of the project. Rename this file to `.env` and `add your own environment variables and secretKeys`. This file will now look something like this:
```JS
PORT=5000

DEV_DATABASE_URL=postgresql://PG_USER:PG_PASSWORD@PG_HOST:PG_PORT/PG_NAME
TEST_DATABASE_URL=postgresql://postgres:BERchmans100@localhost:5432/sendit-test

JWT_SECRET=bsj7HEjebfj5jnosunr9
JWT_ISSUER=ISSUER_NAME
JWT_EXPIRY_TIME=DURATION
```
Step 5. You can start the application in different modes:

- Production
`npm run start-prod`

- Development
`npm start`

## Usage

To see usage and API endpoints, please view API Documentation [here](https://solomonezeobika.docs.apiary.io/).

## Testing

Testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api. `mocha` is the testing framework and `chai` is the assertion library. They will both be installed when you run `npm install`.

To test the application, while within the project root directory run the command:
`npm test` 

## Questions

Contact: ODINAKACHUKWU SOLOMON EZEOBIKA - `solomonzbk@gmail.com`

## Support or Contributions

Support or Contributions are highly appreciated. Please send me an email for any suggestion, support or issue. To contribute:

- Fork this repository or clone the repository with the command:
   `$ git clone https://github.com/ODINAKACHUKWU/SendIT.git`.

- Change directory into the root of the project directory.

- Create your feature branch and make your contributions to your local copy of the project.

- Raise a pull request against the develop branch describing what your feature does and how it can be tested.

## Link to the deployed application

- https://solomon-sendit-api.herokuapp.com/api/v1

## License
```
Monday, 26 August, 2019 05:23PM 
MIT License

Copyright (c) 2019 ODINAKACHUKWU EZEOBIKA

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
