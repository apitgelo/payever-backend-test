export default () => {
  let mongoUri = process.env.MONGODB_USER
    ? `${process.env.MONGODB_URI_SCHEME}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    : `${process.env.MONGODB_URI_SCHEME}://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

  // enable using authsource when connect
  if (process.env.MONGODB_AUTHSOURCE) {
    mongoUri = `${mongoUri}&authSource=${process.env.MONGODB_AUTHSOURCE}`;
  }

  return {
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version,
    debug:
      ['prod', 'production'].indexOf(process.env.NODE_ENV?.toLowerCase()) ===
      -1,
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodb: {
      uri: mongoUri,
      connectionTimeout:
        parseInt(process.env.MONGODB_CONNECTION_TIMEOUT, 10) || 10000,
      socketTimeout: parseInt(process.env.MONGODB_SOCKET_TIMEOUT, 10) || 10000,
      retryAttempts: parseInt(process.env.MONGODB_RETRY_ATTEMPTS, 10) || 5,
    },
  };
};
