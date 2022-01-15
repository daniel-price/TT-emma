import dotenv from "dotenv";

dotenv.config();

const { NODE_LOCAL_PORT = 3000 } = process.env;

export default { NODE_LOCAL_PORT };
