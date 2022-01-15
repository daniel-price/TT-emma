import dotenv from "dotenv";

//this file path won't exist when running in a docker container, instead the env file will be passed in by docker compose
dotenv.config({ path: "../.env" });

const { NODE_LOCAL_PORT = 3000 } = process.env;

export default { NODE_LOCAL_PORT };
