export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      DATABASE_URL: string
      DISCORD_TOKEN: string
    }
  }
}
