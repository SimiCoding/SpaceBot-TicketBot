const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandType,
} = require("discord.js");
const {theme}=require("../../../config.json");
const fs = require("fs");
const path = require('path');
const directory = path.join('guilds.json')
  

module.exports = {
  name: "create",
  description: "Create a new Ticket System",
  // devOnly: Boolean,
  // testOnly: Boolean,
  deleted: false,
  options: [
    {
      name: "ticket-title",
      description: "The title for the message",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "ticket-description",
      description: "The description for the message",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name:"staff-role",
      description: "You have to setup the staff role for all tickets.",
      required: true,
      type: ApplicationCommandOptionType.Role,
    },
    {
      name:"channel",
      description: "The channel the message is in.",
      required:true,
      type: ApplicationCommandOptionType.Channel
    }
   
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    await interaction.reply({content: "Success", ephermal: true})
    const ticketTitle = interaction.options.get("ticket-title").value;
    const ticketDescription =
      interaction.options.get("ticket-description").value;
    const ticketEmbed = new EmbedBuilder().setTitle(ticketTitle).setDescription(ticketDescription).setColor(theme).setTimestamp();

    const role = interaction.options.get("staff-role").value;
    const guildId= interaction.guildId;
    const data = JSON.parse( fs.readFileSync(directory) );
      
    data.guilds.forEach(guild => {
        if(guild.id===guildId){
            guild.staff=role;
        }
    });
    
    fs.writeFileSync(directory, JSON.stringify(data), "utf-8")
    const ticketChannel = client.channels.cache.get(`${interaction.options.get("channel").value}`);
    
    const createButton = new ActionRowBuilder();
    createButton.components.push(
        new ButtonBuilder()
          .setCustomId(`create-ticket`)
          .setLabel(`Create Ticket`)
          .setStyle(ButtonStyle.Primary)
      );

    await ticketChannel.send({ embeds: [ticketEmbed], components: [createButton] });
  },
};
