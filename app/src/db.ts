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

interface IRankingResult extends RowDataPacket {
  name: string;
  ranking: number;
}

export async function retrieveUserRankings(
  userUuid: string,
  fromDate: string,
  toDate: string
) {
  await getConnection().execute(`CALL GetRankings(?,?,?)`, [
    userUuid,
    fromDate,
    toDate,
  ]);

  const [rows] = await getConnection().execute<IRankingResult[]>(
    `SELECT m.display_name AS name, ROUND(r.row_num * 100/ r.num_users_for_merchant, 1) AS ranking
FROM T_RankingPerMerchant r, Merchants m
WHERE r.user_id = ? AND m.id = r.merchant_id;`,
    [userUuid]
  );

  return rows.map(({ name, ranking }) => {
    return { name, ranking };
  });
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

export async function saveMerchant(id: number, displayName: string) {
  await getConnection().execute(`INSERT INTO Merchants VALUES(?,?,?,?)`, [
    id,
    displayName,
    "",
    "",
  ]);
}

export async function saveTransaction(
  id: number,
  userId: number,
  date: string,
  amount: number,
  merchantId: number
) {
  await getConnection().execute(
    `INSERT INTO Transactions VALUES(?,?,?,?,?,?)`,
    [id, userId, date, amount, "", merchantId]
  );
}

export async function saveUser(
  id: number,
  firstName: string,
  lastName: string
) {
  await getConnection().execute(`INSERT INTO Users VALUES(?,?,?)`, [
    id,
    firstName,
    lastName,
  ]);
}

export async function clearTables() {
  await getConnection().execute(`DELETE FROM Transactions`);
  await getConnection().execute(`DELETE FROM Merchants`);
  await getConnection().execute(`DELETE FROM Users`);
}
