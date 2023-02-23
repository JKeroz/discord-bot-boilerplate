import { DiscordClient } from 'src/utils/discord/discord.client'
import { DiscordEvent } from '@models/discord'
import { Interaction } from 'discord.js'

export const interactionEvent: DiscordEvent = {
  name: 'interactionCreate',
  execute: async function (client: DiscordClient, interaction: Interaction): Promise<void> {
    try {
      // Verifies if the interaction is a Slash Command interaction
      if (interaction.isChatInputCommand()) {
        const command = client.getCommand(interaction.commandName)

        if (command) {
          await command.execute(client, interaction)
        }
      }

      // Verifies if the interaction is a Button interaction
      if (interaction.isButton()) {
        const button = client.getButton(interaction.customId)

        if (button) {
          await button.execute(client, interaction)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
}
