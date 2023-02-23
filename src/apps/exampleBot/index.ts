import { DiscordClient } from 'src/utils/discord/discord.client'
import { GatewayIntentBits } from 'discord.js'
import { events } from './events'
import { commands } from './commands'
import { buttons } from './components/buttons'

export async function exampleBot() {
  const exampleBotClient = new DiscordClient({
    token: process.env.DISCORD_TOKEN,
    options: {
      intents: [
        GatewayIntentBits.Guilds,
      ],
    },
    registerCommands: true,
    events: events,
    commands: commands,
    buttons: buttons,
  })

  await exampleBotClient.start()
}
