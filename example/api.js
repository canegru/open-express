const path = require('path');
const openExpress = require('../app');

const api = {
  alive: async (req, res) => {
    res.json({
      status: 'alive',
    });
  },
};

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

openExpress(config)
  .then((app) => {
    app.listen(3000);
    console.log('App running on port 3000');
  });