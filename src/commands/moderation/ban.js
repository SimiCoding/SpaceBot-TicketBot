const {ApplicationCommandOptionType, PermissionFlagsBits}=require("discord.js")

module.exports ={
    name: "ban",
    description: "Ban a member",
    // devOnly: Boolean,
    // testOnly: Boolean,
     deleted: true,
    options: [
        {
            name: "target-user",
            description: "The user to ban ",
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: "reason",
            description: "The reason",
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],


    callback: (client, interaction)=>{
        interaction.reply(`The Ban Hamer has spoken!`);
    }
}