import { DiscordClient } from 'src/utils/discord/discord.client'
import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, Snowflake } from 'discord.js'
import { DiscordCommandInteraction } from '@models/discord'

export const exampleCommand: DiscordCommandInteraction = {
  guilds: new Set<Snowflake>(),
  data: new SlashCommandBuilder().setName('example').setDescription('This is a command example'),
  execute: async function (client: DiscordClient, interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      const button = client.getButton('exampleButton')

      await interaction.reply({
        content: 'Hello from a command',
        embeds: [new EmbedBuilder().setDescription('some embed description')],
        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(button.data)],
      })
    } catch (error) {
      console.log(error)
    }
  },
}
