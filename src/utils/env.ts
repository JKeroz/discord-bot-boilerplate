import { z } from 'zod'

export function validateEnv() {
  const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    DISCORD_TOKEN: z.string(),
  })

  const _env = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  })

  if (!_env.success) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const error of _env.error.issues) {
      console.error('Invalid env var: ', error)
    }
    throw new Error('Invalid or missing environment variables')
  }
}
