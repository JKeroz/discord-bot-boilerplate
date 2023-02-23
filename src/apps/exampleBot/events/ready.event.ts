import { DiscordClient } from 'src/utils/discord/discord.client'
import { DiscordEvent } from '@models/discord'

export const readyEvent: DiscordEvent = {
  name: 'ready',
  execute: async function (client: DiscordClient): Promise<void> {
    try {
      console.log(`Connected as ${client.user.tag}!`)
    } catch (error) {
      console.log(error)
    }
  },
}
