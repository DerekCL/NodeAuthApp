"use strict";

const diagnostics = require("./diagnostics");
const database_options = require("../config/database");
const config = database_options.config;

// Bluebird is the best promise library available today,
// And is the one recommended here:
const promise = require("bluebird");

// Loading all the database repositories separately,
// Because event 'extend' is called multiple times:
const repos = {
    users: require("./repos/users")
};

// Pg-promise initialization options:
const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend: (obj)=>{
        // With different access API.
        // Example: obj.users = new repos.users(obj, pgp);
        for (let r in repos) {
            obj[r] = new repos[r](obj, pgp);
        }
    }
};


// Load and initialize pg-promise:
const pgp = require("pg-promise")(initOptions);

// Create the database instance:
const db = pgp(config);

// Load and initialize optional diagnostics:
diagnostics.init(initOptions);

// If you ever need access to the library"s root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;
