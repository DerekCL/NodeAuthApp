"use strict";

/**
 * This file is for the configuration of the postgresql database
 */

/**
 *  This this the list of configurable parameters
 *
@param {string} host - server name or IP address
@param {number} port - server port number
@param {string} database - database name
@param {string} user - user name
@param {string} password  - user password
*/

const config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

module.exports = {
  config: config,
};
