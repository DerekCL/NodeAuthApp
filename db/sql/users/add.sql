/*
    Inserts a new user record.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

INSERT INTO ${schema~}.users
(
    username,
    google_id,
    google_access_token,
    google_refresh_token,
    admin,
    date_added,
    updated
)
VALUES
(
    ${username},
    ${google_id},
    ${google_access_token},
    ${google_refresh_token},
    ${admin},
    ${date_added},
    ${updated}
)
RETURNING *
