const mongodbstore = require("connect-mongodb-session");
const expressSession = require("express-session");

function createsessionstore() {
  const Mongodbstore = mongodbstore(expressSession);

  const store = new Mongodbstore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "online-shop",
    collections: "sessions",
  });
  return store;
}

function createsessionconfig() {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createsessionstore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // time in miliiseconds
    },
  };
}
module.exports = createsessionconfig;
