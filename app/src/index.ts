import express from "express";
import env from "./env";

const app = express();

app.route("/").get(async (_req, res) => {
  res.send({});
});

app.listen(env.NODE_LOCAL_PORT, () => {
  console.log(
    `Worker: process ${process.pid} is up on port ${env.NODE_LOCAL_PORT}`
  );
});
