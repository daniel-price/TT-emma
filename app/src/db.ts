import mysql, { RowDataPacket } from "mysql2";
import { Connection } from "mysql2/promise";
import env from "./env";

let connection: Connection | null;

function getConnection() {
  if (!connection) {
    connection = mysql
      .createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
      })
      .promise();
  }
  return connection;
}
export async function addMerchants(numOfMerchants: number) {
  await retryDroppedConnection(async () => {
    await getConnection().execute(`CALL CreateMerchants(1, ${numOfMerchants})`);
  });
}

export async function addUsers(numOfUsers: number) {
  await retryDroppedConnection(async () => {
    await getConnection().execute(`CALL CreateUsers(1, ${numOfUsers})`);
  });
}

export async function addTransactions(
  numOfTransactions: number,
  numOfUsers: number,
  numOfMerchants: number
) {
  await retryDroppedConnection(async () => {
    await getConnection().execute(
      `CALL CreateTransactions(1, ${numOfTransactions}, ${numOfUsers}, ${numOfMerchants})`
    );
  });
}

async function retryDroppedConnection(dbFn: () => Promise<void>) {
  try {
    await dbFn();
  } catch (e) {
    console.error(e);
    connection = null;
    await retryDroppedConnection(dbFn);
  }
}

export function closeConnection() {
  getConnection().end();
}
