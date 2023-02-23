import { APIApplicationCommand, Client, ClientEvents, Collection, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { DiscordClientOptions } from '@models/discord'
import { DiscordEvent } from '@models/discord'
import { DiscordCommandInteraction, DiscordButtonInteraction } from '@models/discord'

export class DiscordClient extends Client {
  private commands: Collection<string, DiscordCommandInteraction> = new Collection()
  private events: Collection<keyof ClientEvents, DiscordEvent> = new Collection()
  private buttons: Collection<string, DiscordButtonInteraction> = new Collection()
  private readonly restapi: REST = new REST({ version: '10' })

  constructor(private readonly clientOptions: DiscordClientOptions) {
    super(clientOptions.options)
    this.restapi.setToken(clientOptions.token)
    this.setCollections()
  }

  /**
   * Start up the websocket connection to discord and register slash commands if registerCommands option is enabled.
   */
  public async start(): Promise<void> {
    await this.login(this.clientOptions.token)
    await this.registerGuildCommands()
  }

  private setCollections(): void {
    this.setEvents()
    this.setCommands()
    this.setButtons()
  }

  /**
   * Adds events if provided to the Events Collection and starts the event listeners.
   * This is also injecting the DiscordClient instance into every single event.
   */
  private setEvents(): void {
    if (this.clientOptions.events?.length) {
      this.clientOptions.events.forEach((event) => {
        this.events.set(event.name, event)
        this.on(event.name, (...args) => event.execute(this, ...args))
      })
    }
  }

  /**
   * Adds commands if provided to the Commands Collection.
   */
  private setCommands(): void {
    if (this.clientOptions.commands?.length) {
      this.clientOptions.commands.forEach((command) => {
        this.commands.set(command.data.name, command)
      })
    }
  }

  /**
   * Adds buttons if provided to the Buttons Collection.
   */
  private setButtons(): void {
    if (this.clientOptions.buttons?.length) {
      this.clientOptions.buttons.forEach((button) => {
        this.buttons.set(button.customId, button)
      })
    }
  }

  /*
   * Gets a slash command from the Commands Collection.
   * @param {string} commandName - Name of the command to get.
   * @returns {SlashCommand} Slash command with the given name.
   */
  public getCommand(commandName: string): DiscordCommandInteraction {
    return this.commands.get(commandName)
  }

  /*
   * Gets an event from the Events Collection.
   * @param {string} eventName - Name of the event to get.
   * @returns {DiscordEvent} Event with the given name.
   */
  public getEvent(eventName: keyof ClientEvents): DiscordEvent {
    return this.events.get(eventName)
  }

  /*
   * Gets an event from the Buttons Collection.
   * @param {string} customId - Id of the button to get.
   * @returns {ButtonCommand} Button with the given custom Id.
   */
  public getButton(customId: string): DiscordButtonInteraction {
    return this.buttons.get(customId)
  }

  /**
   * Registers guild commands found in the commands Collection
   * Iterates through every guild the bot application is a part of.
   */
  private async registerGuildCommands(): Promise<void> {
    if (!this.clientOptions.registerCommands) return

    this.guilds.cache.each(async (guild) => {
      const commands = this.getGuildCommands(guild.id)

      if (commands.size > 0) {
        const updatedCommands = await this.updateGuildSlashCommands(
          commands.map((command) => command.data.toJSON()),
          guild.id
        )

        if (process.env.NODE_ENV === 'development') {
          console.log(updatedCommands)
        }
      }
    })
  }

  /**
   * Returns the guild slash commands in the commands Collection from the given guild ID.
   * @param {string} guildId - ID of the guild the commands are from.
   * @returns {Collection<string, DiscordCommandInteraction>} Collection of guild slash commands.
   */
  private getGuildCommands(guildId: string): Collection<string, DiscordCommandInteraction> {
    return this.commands.filter((command) => command.guilds.has(guildId))
  }

  /**
   * Updates the guild slash commands from the given array of commands.
   * @param {RESTPostAPIApplicationCommandsJSONBody[]} commands - Array of slash commands created with the SlashCommandBuilder class
   * @param {string} guildId - ID of the guild where the permissions will be updated.
   * @returns {APIApplicationCommand[]} Array of guild slash commands.
   * @throws {Error} If the application is not authorized to modify slash commands
   */
  private async updateGuildSlashCommands(commands: RESTPostAPIApplicationCommandsJSONBody[], guildId: string): Promise<APIApplicationCommand[]> {
    return (await this.restapi.put(Routes.applicationGuildCommands(this.application.id, guildId), {
      body: commands,
    })) as APIApplicationCommand[]
  }
}
