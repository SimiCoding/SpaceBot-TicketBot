const { EmbedBuilder } = require("discord.js");
const {theme}=require("../../../config.json");

module.exports ={
    name: "ping",
    description: "Replies with the client ping",
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,


    callback: (client, interaction)=>{
        const embed = new EmbedBuilder().setTitle("Ping").setDescription(`Pong! ${client.ws.ping}ms`).setColor(theme)
        interaction.reply({embeds: [embed]});
    }
}