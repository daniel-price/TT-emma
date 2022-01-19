import express from "express";
import { validateRequest } from "zod-express-middleware";
import { RankingsInputSchema } from "./types";
import { getRankings } from "./rankings";
import { createData } from "./createData";

const app = express();

app.get("/", (_req, res) => {
  res.send("API available");
});

app.get(
  "/rankings",
  validateRequest({
    query: RankingsInputSchema,
  }),
  async (req, res) => {
    const rankings = await getRankings(req.query);

    res.send(rankings);
  }
);

app.get("/createData", (_req, res) => {
  createData();
  res.send("creating data - see console for progress");
});

export default app;
