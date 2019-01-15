require('isomorphic-fetch');
require('dotenv').config();

const fs = require('fs');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const logger = require('morgan');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');

const ShopifyAPIClient = require('shopify-api-node');
// const ShopifyExpress = require('@topmonks/shopify-express');
const ShopifyExpress = require('@shopify/shopify-express');
const {MemoryStrategy,SQLStrategy} = require('@shopify/shopify-express/strategies');

const {
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_HOST,
  SHOPIFY_APP_SECRET,
  NODE_ENV,
} = process.env;


const shopifyConfig = {
  host: SHOPIFY_APP_HOST,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: ['write_orders, write_products'],
  shopStore: new MemoryStrategy(),
  afterAuth(request, response) {
		const { session: { accessToken, shop, returnUrl = '/pos' } } = request;
   	return response.redirect(returnUrl);
  },
};

const app = express();
const isDevelopment = NODE_ENV !== 'production';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(
  session({
    store: isDevelopment ? undefined : undefined,
    secret: SHOPIFY_APP_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);


if (isDevelopment) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  const staticPath = path.resolve(__dirname, '../assets');
  app.use('/assets', express.static(staticPath));
}

// Install
app.get('/install', (req, res) => {
  res.render('install')
});





const shopify = ShopifyExpress(shopifyConfig);

// Mount Shopify Routes
const {routes, middleware} = shopify;
const {withShop, withWebhook} = middleware;

app.use('/shopify', routes);

// Client
app.get('/desktop', withShop({authBaseUrl: '/shopify'}), function(request, response) {
  console.log('GET /desktop');
  const { session: { shop, accessToken } } = request;
  response.render('app', {
    title: 'Shopify Desktop App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
  });
});
app.get('/pos', withShop({authBaseUrl: '/shopify'}), function(request, response) {
  console.log('GET /pos');
  const { session: { shop, accessToken } } = request;
  response.render('app', {
    title: 'Shopify POS App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
  });
});
app.get('/', withShop({authBaseUrl: '/shopify'}), function(request, response) {
  console.log('GET /');
  const { session: { shop, accessToken } } = request;
  response.render('app', {
    title: 'Shopify App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
  });
});

// Error Handlers
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
