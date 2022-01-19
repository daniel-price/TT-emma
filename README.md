## Summary

Root folder holds general dev tools configuration files (husky, eslint etc), and a docker-compose and init.sql to bring up a mysql database with an appropriate schema.
The express application code lives inside the app directory.

`docker-compose up` brings up mysql and express app containers.
`docker-compose up mysqldb` brings up just the mysql container - this is useful if you want to run the app locally for debugging.

## Design thoughts
The ranking calculation is all handled by sql rather than the application to reduce the amount of data needed to be transferred to the application, and so we can take advantage of indexes for speeding up the queries.

First, we create a new table of only the relevant rows (transactions within the date period, for relevant merchants), making use of appropriate indexes to ensure this is efficient.
This means that the actual calculation sql runs on a significantly smaller table.

## Data access patterns
1. Retrieve distinct merchantIds for transactions between two dates for a given userId.
   Speed up with partial index on userId and date.
2. Retrieve all transactions for those merchantIds between two dates
   Spped up with index on merchantId and date
3. Group those transactions by merchantId and userId, summing the amounts. 
   Order by merchantId and amount.
   The percentage ranking will be the row number/total number of rows for merchant.
   This requires a scan of all those results, so indexes won't help
