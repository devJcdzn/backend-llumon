import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_FILE_NAME: z.string(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string(),
});

export const env = envSchema.parse(process.env);
