"use strict";

const sql = require("../sql").users;
const {encrypt} = require("../../config/encryption");

class users_repository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    // Creates the table;
    create() {
        return this.db.none(sql.create);
    }
    // Initializes the table with some user records, and return their id-s;
    init() {
        return this.db.map(sql.init, [], row=>row.id);
    }
    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }
    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }
    // Adds a new user, and returns the new object;
    add(values) {
        return this.db.one(sql.add, {
            id: values.id,
            username: values.username,
            password: encrypt(values.password)
        });
    }
    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id) {
        return this.db.result("DELETE FROM users WHERE id = $1", +id, r=>r.rowCount);
    }
    // Tries to find a user from id;
    findById(id) {
        return this.db.oneOrNone("SELECT * FROM users WHERE id = $1", +id);
    }
    // Tries to find a user from name;
    findByName(name) {
        return this.db.oneOrNone("SELECT * FROM users WHERE name = $1", name);
    }
    // Returns all user records;
    all() {
        return this.db.any("SELECT * FROM users");
    }
    // Returns the total number of users;
    total() {
        return this.db.one("SELECT count(*) FROM users", [], a=>+a.count);
    }
}

module.exports = users_repository;
