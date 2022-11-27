const RefCommand = require('#structures/RefCommand')
const { MessageEmbed } = require('discord.js')

class HelpCommand extends RefCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'List all commands',
      aliases: ['commands']
    })
  }

  async messageRun(message) {
    const commands = this.container.stores.get('commands')
    const categories = [...new Set(commands.map(cmd => cmd.category))]

    const string = categories.map(category => {
      const cmds = commands.filter(cmd => cmd.category === category)
      const cmdsStr = cmds.map(cmd => {
        return `  ➥ ${cmd.name} - ${cmd.description}`
      }).join('\n')

      return `〢 ${category}\n${cmdsStr}`
    }).join('\n\n')

    const embed = new MessageEmbed()
      .setTitle('Commands')
      .setDescription(string)
      .setColor('AQUA')

    await message.reply({
      embeds: [embed]
    })
  }
}

module.exports = HelpCommand