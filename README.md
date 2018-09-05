# NodeAuthApp
A microservice that does authentication in node.js and express

## Requirements
node version 8.11.1
npm version 5.6.0
port 9000 open

in addition you will need a .env file that is not uploaded to github for security purposes
you will also need a authKeys.js file that is not uploaded to github for security purposes

## First steps
To install dependencies, run `npm install`. After you've installed all the
dependencies, you can start running.

## Running in Development Mode
`npm run start:dev`
or simply `npm start`

## Running in Production Mode
`npm run start:prod`
or simply `node index.js`

Basic Usage
-----------

### Running tests
This project uses [Istanbul][Istanbul] for code coverage with [`mocha`][mocha] for the test framework, [chai][chai] library for assertions.

This will run all tests in the [`./src/test`][test-dir] directory.

### Coverage

A coverage report will be generated by running the `$ npm test` command and outputted into the build directory.

Open the lcov-report for an overview of your code coverage:

    $ open ./coverage/lcov-report/index.html


-----------------------------------

<!-- references -->
[awesome-typescript-loader]: https://github.com/s-panferov/awesome-typescript-loader/tree/v5.2.0
[Istanbul]: https://istanbul.js.org/
[mocha]: https://github.com/mochajs/mocha
[chai]: https://github.com/chaijs/chai/tree/4.1.2
[test-dir]: ./test/
