import { z } from "zod";
import { isValidDate } from "iso-datestring-validator";

export const RankingsInputSchema = z.object({
  userId: z.string(),
  fromDate: z.string().refine((s) => isValidDate(s), {
    message: "Must be an ISO date string",
  }),
  toDate: z.string().refine((s) => isValidDate(s), {
    message: "Must be an ISO date string",
  }),
});

export type RankingsInput = z.infer<typeof RankingsInputSchema>;
