const { PermissionOverwriteManager,ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField } = require("discord.js");
const {theme}=require("../../../config.json");
const fs = require("fs");
const path = require('path');
const directory = path.join('guilds.json')
const guilds = JSON.parse( fs.readFileSync(directory) );

module.exports = {
  name: "create-ticket",
  // devOnly: Boolean,
  // testOnly: Boolean,
  deleted: false,

  callback: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const guild = await client.guilds.fetch(interaction.guildId);
const ticketEmbed = new EmbedBuilder().setTitle("Ticket").setDescription("A staff member will soon take care of you.").setColor(theme).setTimestamp();
const buttons = new ActionRowBuilder;
buttons.components.push(
    new ButtonBuilder()
      .setCustomId(`delete-ticket`)
      .setLabel(`Delete`)
      .setStyle(ButtonStyle.Danger)
  );


  let staffRole=undefined;
  guilds.guilds.forEach(guild => {
    if(guild.id===interaction.guildId){
      staffRole=guild.staff;
    }
  });
  if(staffRole===undefined){
    await interaction.editReply("This server hasnt set up a staff role yet.")
    return;
  }
  const hasRole = interaction.member.roles.cache.has(staffRole);

    guild.channels.create({
      name: `ticket-${interaction.user.tag}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.member,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        },
        {
id: staffRole,
allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        },
        {
          id: interaction.guild.roles.everyone.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    }).then(channel => {



        channel.send({embeds: [ticketEmbed], components: [buttons]})
     } );
    await interaction.editReply("Ticket was created");
  },
};
