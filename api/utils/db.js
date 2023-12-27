const { CONNECTION_STRING } = require("./constants");
const pgp = require("pg-promise")();

let _db = null;

function initDb() {
  if (!_db) {
    _db = pgp(CONNECTION_STRING);
  }

  return _db;
}

module.exports = {
  getDb: function () {
    return initDb();
  },
};
