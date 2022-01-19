import { addMerchants, addTransactions, addUsers } from "./db";

const NUM_OF_MERCHANTS = 500000;
const NUM_OF_USERS = 1000000;
const NUM_OF_TRANSACTIONS = 1000000000;

const DEFAULT_BATCH_SIZE = 100000;
const TRANSACTIONS_BATCH_SIZE = 30000;

export async function createData() {
  console.log(`creating data`);
  await batchCreate(
    async () => await addMerchants(DEFAULT_BATCH_SIZE),
    NUM_OF_MERCHANTS,
    "merchants"
  );
  await batchCreate(
    async () => await addUsers(DEFAULT_BATCH_SIZE),
    NUM_OF_USERS,
    "users"
  );
  await batchCreate(
    async () =>
      await addTransactions(
        TRANSACTIONS_BATCH_SIZE,
        NUM_OF_USERS,
        NUM_OF_MERCHANTS
      ),
    NUM_OF_TRANSACTIONS,
    "transactions",
    TRANSACTIONS_BATCH_SIZE
  );
  console.log(`finished creating data`);
}

async function batchCreate(
  createFn: () => Promise<void>,
  numRows: number,
  type: string,
  batchSize = DEFAULT_BATCH_SIZE
) {
  console.log(`creating ${numRows} ${type}`);
  let inserted = 0;
  while (inserted < numRows) {
    const newInserted = Math.min(inserted + batchSize, numRows);
    await createFn();
    inserted = newInserted;
    console.log(
      `added ${inserted}/${numRows} (${(inserted * 100) / numRows}%) ${type}`
    );
  }
  console.log(`finished adding ${type}`);
}
