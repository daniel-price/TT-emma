import app from "./app";
import env from "./env";

app.listen(env.NODE_LOCAL_PORT, () => {
  console.log(
    `Worker: process ${process.pid} is up on port ${env.NODE_LOCAL_PORT}`
  );
});
