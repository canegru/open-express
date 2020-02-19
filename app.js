const express = require('express');
const path = require('path');
const { connector } = require('swagger-routes-express');
const YAML = require('yamljs');
const { isPlainObject, get } = require('lodash');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const jsonRefs = require('json-refs');

const defaultErrorHandler = async (err, req, res, next) => {
  const status = get(err, 'status', 500);
  const message = get(err, 'message', 'Critical Failure');
  res.status(status).json({
    status,
    message,
  });
  next();
};

const openExpress = async (options) => {
  let app;

  try {
    const {
      routerPath,
      operations,
      apiOptions,
      errorHandler = defaultErrorHandler,
    } = options;

    // Validate basic options
    if (!path.isAbsolute(routerPath)) throw new Error('Path must be valid and an absolute path');
    if (!isPlainObject(operations)) throw new Error('Operations must be an object with props');

    // If error handler not passed, we will use the default one

    // Init OpenAPI 3.0
    const apiDefinition = await YAML.load(routerPath);

    // Check for code splitting in file
    const refOptions = {
      loaderOptions: {
        processContent: async (content, callback) => callback(await YAML.load(content.location)),
      },
      location: routerPath,
    };

    const apiDefinitionParsed = await jsonRefs.resolveRefs(apiDefinition, refOptions);

    const connect = connector(operations, apiDefinitionParsed.resolved, apiOptions);
    app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Init Validator
    const validator = new OpenApiValidator({ apiSpec: routerPath, validateResponses: true });
    await validator.install(app);

    // Connector
    connect(app);

    // Error Handlers
    app.use(errorHandler);
  } catch (e) {
    console.log(e);
  }

  // Return express app for usage
  return app;
};

module.exports = openExpress;