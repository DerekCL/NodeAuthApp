"use strict";

const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

/**
///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query logic and its formatting parameters. However, this
// is very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////
*/

module.exports = {
  users: {
    add: sql("users/add.sql"),
    create: sql("users/create.sql"),
    drop: sql("users/drop.sql"),
    empty: sql("users/empty.sql"),
    findByGoogleId: sql("users/findByGoogleId.sql"),
  },
};
/**
 *  Helper for linking to external query files;
 */
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option "compress" in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable "schema" in each SQL (as an example);
    params: {
      schema: "public", // replace ${schema~} with "public"
    },
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
