## Summary

Express app with `/rankings` endpoint for finding the merchants a user has used within a given date range and how much they spent compared to other users.

## Developing

`yarn dev` runs a local server against the docker mysql container.

## Testing

`yarn test` runs unit tests (does not require mysql container to be running).
`yarn testAll` runs unit and integration tests (requires mysql container to be running).

## Generating test data

Edit the constants in `src/createData.ts` to the required number of rows, then make a GET request to the /createData endpoint.
