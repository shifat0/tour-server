const config = {
  development: {
    NOSQL: process.env.DEV_MONGODB_CONNECTION_STRING,
  },
  production: {
    NOSQL: process.env.PROD_MONGODB_CONNECTION_STRING,
  },
};

const configData =
  process.env.NODE_ENV === "DEV" ? config.development : config.production;

module.exports = configData;
