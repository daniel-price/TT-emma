import { RankingsInput } from "./types";

export async function getRankings({ userId, fromDate, toDate }: RankingsInput) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { userId, fromDate, toDate };
}
