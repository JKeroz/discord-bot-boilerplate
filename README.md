![Logo](https://discord.js.org/static/logo.svg)

## DiscordJs-boilerplate
This is a DiscordJs version 14 **Typescript** repository meant to be forked and used freely

## Tech Stack
- **NodeJs/Typescript**
- **DiscordJs**

## Run Locally
- Clone the project
- Install dependencies
```bash
  npm install
```
- Start the server
```bash
  npm run dev
```

## Environment Variables
To run this project, you will need to add the environment variables found in the example-env.txt file to your .env file

## Folder Structure
    src
    ├── apps                        
    │   ├── exampleBot                      
    │   │   ├── commands                    # commands folder
    │   │   │   ├── example.command.ts      # command file
    │   │   │   └── index.ts                # commands index file for exporting
    │   │   │
    │   │   ├── components                  # components folder
    │   │   │   ├── example.button.ts       # button command/component file
    │   │   │   ├── example.modal.ts        # modal component file
    │   │   │   └── index.ts                # components index file for exporting
    │   │   │
    │   │   ├── events                      # events folder
    │   │   │   ├── interaction.event.ts    # interactionCreate event file
    │   │   │   ├── ready.event.ts          # ready event file
    │   │   │   └── index.ts                # events index file for exporting
    │   │   │
    │   │   └── index.ts                    # exampleBot starting point
    │   │
    │   └── exampleBot2                     
    │       ├── commands                    # commands folder
    │       │   ├── example.command.ts      # command file
    │       │   └── index.ts                # commands index file for exporting
    │       │
    │       ├── components                  # components folder
    │       │   ├── example.button.ts       # button command/component file
    │       │   ├── example.modal.ts        # modal component file
    │       │   └── index.ts                # components index file for exporting
    │       │
    │       ├── events                      # events folder
    │       │   ├── message.event.ts        # messageCreate event file
    │       │   ├── ready.event.ts          # ready event file
    │       │   └── index.ts                # events index file for exporting
    │       │
    │       └── index.ts                    # exampleBot2 starting point
    │
    │── models                              # Global DTOs / Types / Interfaces
    │   └── discord.ts                      # Discord custom types
    │
    └── index.ts                            # Application starting point

## Usage/Examples

**App/exampleBot/index.ts**
- Main app function:
```javascript
import { DiscordClient } from 'src/utils/discord/discord.client'
import { GatewayIntentBits } from 'discord.js'
import { events } from './events'
import { commands } from './commands'
import { buttons } from './components/buttons'

export async function exampleBot() {
  const exampleBotClient = new DiscordClient({
    token: process.env.DISCORD_TOKEN,
    options: {
      intents: [ // Add your intents here
        GatewayIntentBits.Guilds, // The DiscordClient requires this intent to be able to register the guild commands.
      ],
    },
    registerCommands: true,
    events: events,
    commands: commands,
    buttons: buttons,
  })

  await exampleBotClient.start() // This will automatically register guild commands.
}
```
**App/exampleBot/events/ready.event.ts**
- Discord Event example:
```javascript
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
```
**App/exampleBot/commands/example.command.ts**
- Slash Command example:
```javascript
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
```

## Documentation
- [DiscordJs docs](https://discord.js.org/#/docs/discord.js/stable/general/welcome)
- [DiscordJs v14 migration guide](https://discordjs.guide/additional-info/changes-in-v14.html#before-you-start)

## Optimizations
- Custom `DiscordClient` class for abstracting common functionality
- `Client` injected as dependency to all events and commands.

## Roadmap
- Additional support for more components
- Add more integrations and base methods to custom client
- Possible custom CLI

## Authors
- [Ruben Valdes - valdes.ruben92@gmail.com](https://github.com/JKeroz)



