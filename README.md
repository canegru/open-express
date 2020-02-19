
<h1 align="center">Welcome to open-express 👋</h1>

<p>

<img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000"  />

<a href="#" target="_blank">

<img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg"  />

</a>

</p>

  

> Quickly spin up express APIs using OpenAPI 3.0 or Swagger 2.0 definitions.

  

This module uses `express, express-openapi-validator and swagger-routes-express`.

  

## Install
```bash
$ npm install open-express
```

## Example
**example.js**
```js
const openExpress = require('open-express');

// Define all your operations here
const api = {
  alive: async (req, res) => {
    res.json({
      status: 'alive',
    });
  },
};

// Define all configs
const config = {
  routerPath: path.join(__dirname, './router.yaml'),
  operations: api,
};

// Call open-express with config
openExpress(config)
  .then((app) => {
    app.listen(3000);
    console.log('App running on port 3000');
  });
 
```


**router.yaml**
```yaml
openapi: 3.0.0
info:
  $ref: ./info.yaml

servers:
  - url: /api/v1

paths:
  /alive:
    get:
      tags:
        - alive
      summary: Get API Status
      description: Get API Status
      operationId: alive
      responses:
        "200":
          description: success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ServerInfo"

  /alive:
    get:
      tags:
        - alive
      summary: Get API Status
      description: Get API Status
      operationId: alive
      security:
        - BearerAuth: []
      responses:
        "200":
          description: success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ServerInfo"

components:
  schemas:
    ServerInfo:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        version:
          type: string
        uptime:
          type: number
          
```

## Usage

`config`:
* `routerPath (string) *` Path to your OpenAPI 3.0 or OpenAPI 2.0 .yaml file
* `operations (object) *` All your endpoint operations
* `errorHandler (func) -` Custom error handler
* `apiOptions (object) -`
	 * `security (object) -` All your endpoint operations
	 * `middleware (object) -` Any custom middleware

## Show your support

  

Give a ⭐️ if this project helped you!