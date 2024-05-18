import { envSchema } from "@schemas/schema";

const ENV = envSchema.parse(process.env);

export default ENV;
