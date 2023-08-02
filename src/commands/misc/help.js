const { EmbedBuilder } = require("discord.js");
const {theme}=require("../../../config.json");

module.exports ={
    name: "help",
    description: "Replies with the command list",
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,


    callback: (client, interaction)=>{
        const embed = new EmbedBuilder().setTitle("Help")
        .setDescription("This is the current command list:")
        .addFields(
          {
            name: "/create",
            value: "This command requires Administrator and is the setup for a new ticket system.",
          },
          {
            name: "Ping",
            value: "This command shows the clients ping",
          },
        )
        .setColor(theme);
        interaction.reply({embeds: [embed]});
    }
}