import { DiscordClient } from 'src/utils/discord/discord.client'
import {
  ClientOptions,
  ClientEvents,
  Awaitable,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ButtonBuilder,
  Snowflake,
} from 'discord.js'

type DiscordExecute = {
  execute: (client: DiscordClient, ...args: ClientEvents[keyof ClientEvents]) => Awaitable<void>
}

export type DiscordEvent = {
  name: keyof ClientEvents
} & DiscordExecute

export type SlashCommandData =
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>

export type DiscordInteraction<T> = {
  data: T
  guilds: Set<Snowflake>
} & DiscordExecute

export type DiscordCommandInteraction = DiscordInteraction<SlashCommandData>

export type DiscordButtonInteraction = {
  customId: string
} & DiscordInteraction<ButtonBuilder>

export type DiscordClientOptions = {
  token: string
  options: ClientOptions
  commands?: DiscordCommandInteraction[]
  registerCommands?: boolean
  errorChannelId?: string
  events?: DiscordEvent[]
  buttons?: DiscordButtonInteraction[]
}
