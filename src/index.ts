import { exampleBot } from './apps/exampleBot'
import { validateEnv } from './utils/env'

async function main() {
  validateEnv()
  await exampleBot()
}

main()
