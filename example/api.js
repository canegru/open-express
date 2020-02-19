const path = require('path');
const openExpress = require('../app');

// Define all your operations here
const api = {
  alive: async (req, res) => {
    res.json({
      status: 'alive',
    });
  },
};

// BearerAuth Middleware
const BearerAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('TCL: BearerAuth -> authorization', authorization);
    // ...Verify JWT HERE
    next();
  } catch (e) {
    next(e);
  }
};

// Define all configs
const config = {
  routerPath: path.join(__dirname, './router.yaml'),
  operations: api,
  apiOptions: {
    security: {
      BearerAuth,
    },
    middleware: {
      // ....
    },
  },
};

// Call open-express with config
openExpress(config)
  .then((app) => {
    app.listen(3000);
    console.log('App running on port 3000');
  });