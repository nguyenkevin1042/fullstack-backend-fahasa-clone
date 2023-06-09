require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false,
    "query": {
      "raw": false
    },
    // "withCredentials": true,
    // "headers": {
    //   'Accept-Encoding': 'gzip',
    // },
    "dialectOptions": {
      "decimalNumbers": true,
      "ssl": process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : {}
    },
    "timezone": "+07:00",

    "Compression": {
      "Enabled": true,
      "ResponseCompressionOptions": {
        "EnableForHttps": true,
        "MimeTypes": [
          "text/plain",
          "text/css",
          "application/javascript",
          "text/html",
          "application/xml",
          "text/xml",
          "application/json",
          "text/json",
          "application/wasm"]
      },
      "GzipCompressionProviderOptions": {
        "Level": "Fastest"
      }
    }
  },
  "redis": {
    "host": process.env.REDIS_DB_USER,
    "port": process.env.REDIS_PORT,
    "password": process.env.REDIS_DB_PASSWORD
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
