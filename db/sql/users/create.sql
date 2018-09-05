/*
    Creates table Users.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.users
(
    id serial PRIMARY KEY,
    username text,
    google_id text,
    google_access_token text,
    google_refresh_token text,
    admin boolean,
    date_added timestamp with time zone,
    updated timestamp with time zone
)
