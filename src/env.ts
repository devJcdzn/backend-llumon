import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_FILE_NAME: z.string(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string(),
  EFI_BASE_URL: z.string().url(),
  EFI_CLIENT_ID: z.string(),
  EFI_CLIENT_SECRET: z.string(),
  EFI_PROD_URL: z.string().url(),
  EFI_PROD_CLIENT_ID: z.string(),
  EFI_PROD_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
