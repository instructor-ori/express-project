import z from "zod";

const EnvSchema = z.object({
  DATABASE_NAME: z.string().nonempty(),
  DATABASE_USER: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_PORT: z.coerce.number().positive(),
  PORT: z.coerce.number().positive(),
});

export const env = EnvSchema.parse(process.env);
