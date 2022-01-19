## Summary

Express app with `/rankings` endpoint for finding the merchants a user has used within a given date range and how much they spent compared to other users.

## Developing

`yarn dev` runs a local server against the docker mysql container.

## Generating test data

Edit the constants in `src/createData.ts` to the required number of rows, then make a GET request to the /createData endpoint.
