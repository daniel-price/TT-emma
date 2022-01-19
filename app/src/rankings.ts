import { retrieveUserRankings } from "./db";
import { RankingsInput } from "./types";

export async function getRankings({ userId, fromDate, toDate }: RankingsInput) {
  return await retrieveUserRankings(userId, fromDate, toDate);
}
