"use strict";

const sql = require("../sql").users;
const { encrypt } = require("../../config/encryption");
const moment = require("moment-timezone");

class users_repository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
  // Adds a new user, and returns the new object;
  add(values) {
    let now = moment()
      .tz("America/Winnipeg")
      .format();
    // Values Check
    let googleAccessToken = values.google_access_token;
    if (googleAccessToken === undefined || googleAccessToken === null) {
      googleAccessToken = "";
    }
    let googleRefreshToken = values.google_refresh_token;
    if (googleRefreshToken === undefined || googleRefreshToken === null) {
      googleRefreshToken = "";
    }
    return this.db.one(sql.add, {
      username: values.username,
      google_id: values.google_id,
      google_access_token: encrypt(googleAccessToken),
      google_refresh_token: encrypt(googleRefreshToken),
      admin: true,
      date_added: now,
      updated: now,
    });
  }
  // Creates the table;
  create() {
    return this.db.none(sql.create);
  }
  // Initializes the table with some user records, and return their id-s;
  // Drops the table;
  drop() {
    return this.db.none(sql.drop);
  }
  // Removes all records from the table;
  empty() {
    return this.db.none(sql.empty);
  }

  findByGoogleId(values) {
    return this.db.oneOrNone(sql.findByGoogleId, {
      google_id: values.google_id,
    });
  }

  findByGoogleToken(id) {
    return this.db.oneOrNone(sql.findByGoogleToken, {
      id,
    });
  }

  findBySystemId(id) {
    return this.db.oneOrNone(sql.findBySystemId, {
      id,
    });
  }
}

module.exports = users_repository;
