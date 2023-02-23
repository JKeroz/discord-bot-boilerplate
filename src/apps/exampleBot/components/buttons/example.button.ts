import { DiscordClient } from 'src/utils/discord/discord.client'
import { ButtonBuilder, ButtonInteraction, ButtonStyle, Snowflake } from 'discord.js'
import { DiscordButtonInteraction } from '@models/discord'

const customId = 'exampleButton'

export const exampleButton: DiscordButtonInteraction = {
  guilds: new Set<Snowflake>(),
  customId: customId,
  data: new ButtonBuilder().setCustomId(customId).setStyle(ButtonStyle.Primary).setLabel('Example'),
  execute: async function (client: DiscordClient, interaction: ButtonInteraction): Promise<void> {
    try {
      await interaction.reply({ content: 'im a button from ' + client.user.tag })
    } catch (error) {
      console.log(error)
    }
  },
}
