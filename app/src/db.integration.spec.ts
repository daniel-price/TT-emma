import {
  clearTables,
  closeConnection,
  retrieveUserRankings,
  saveMerchant,
  saveTransaction,
  saveUser,
} from "../src/db";

describe("GetRankings stored procedure", () => {
  beforeAll(async () => {
    await clearTables();

    await saveMerchant(1, "Asda");
    await saveMerchant(2, "Boots");
    await saveMerchant(3, "Costa");
    await saveMerchant(4, "Dunhelm");
    await saveUser(1, "Alex", "Aardvark");
    await saveUser(2, "Betty", "Beaver");
    await saveUser(3, "Charlie", "Cheetah");
    await saveUser(4, "Danny", "Dingo");
    await saveTransaction(1, 1, "2020-02-01", 10, 1);
    await saveTransaction(2, 1, "2020-02-03", 10, 1);
    await saveTransaction(3, 1, "2020-02-04", 10, 1);
    await saveTransaction(4, 1, "2020-02-05", 10, 2);
    await saveTransaction(5, 1, "2020-02-06", 10, 2);
    await saveTransaction(6, 1, "2020-02-07", 10, 2);
    await saveTransaction(7, 2, "2020-02-01", 1, 1);
    await saveTransaction(8, 2, "2020-02-02", 1, 1);
    await saveTransaction(9, 3, "2020-02-03", 5, 3);
    await saveTransaction(10, 3, "2020-04-01", 150, 1);
    await saveTransaction(11, 3, "2020-04-01", 0.1, 2);
  });

  afterAll(() => {
    closeConnection();
  });

  it("should return expected results for multiple merchants", async () => {
    const result = await retrieveUserRankings("1", "2020-01-01", "2020-03-01");
    expect(result).toEqual([
      { name: "Asda", ranking: "50.0" },
      { name: "Boots", ranking: "100.0" },
    ]);
  });

  it("should return expected results for single merchants", async () => {
    const result = await retrieveUserRankings("2", "2020-01-01", "2020-03-01");
    expect(result).toEqual([{ name: "Asda", ranking: "100.0" }]);
  });

  it("should return expected results for no merchants", async () => {
    const result = await retrieveUserRankings("4", "2020-01-01", "2020-03-01");
    expect(result).toEqual([]);
  });

  it("should take date range into account correctly", async () => {
    const result = await retrieveUserRankings("1", "2020-01-01", "2020-05-01");
    expect(result).toEqual([
      { name: "Asda", ranking: "66.7" },
      { name: "Boots", ranking: "50.0" },
    ]);
  });
});
