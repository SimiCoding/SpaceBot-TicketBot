const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const fs = require("fs");
const path = require('path');
const directory = path.join('guilds.json')
const guilds = JSON.parse( fs.readFileSync(directory) );

module.exports = {
  name: "delete-ticket",
  // devOnly: Boolean,
  // testOnly: Boolean,
  deleted: false,

  callback: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: true,
    });

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

    if(!hasRole){
      await interaction.editReply("You need to be in the staff team to be able to close this ticket.");
      return;
    } else {
      const channel = await client.channels.cache.get(interaction.channelId);
   setTimeout(() => {
    channel.delete()
   }, 2500);

    await interaction.editReply("Ticket will be deleted");
    }
    
  },
};
