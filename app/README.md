## Summary

Express app with `/rankings` endpoint for finding the merchants a user has used within a given date range and how much they spent compared to other users.

## Developing

`yarn dev`

## Data access patterns

1. Retrieve distinct merchantIds for transactions between two dates for a given userId.
   Speed up with partial index on userId and date.
2. Retrieve all transactions for those merchantIds between two dates
   Spped up with index on merchantId and date
3. Group those transactions by merchantId and userId, summing the amounts. 
   Order by merchantId and amount.
   The percentage ranking will be the row number/total number of rows for merchant.
   This requires a scan of all those results, so indexes won't help
