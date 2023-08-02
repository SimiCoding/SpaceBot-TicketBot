const {devs, testServer}=require("../../../config.json");
const getButtons = require("../../utils/getButtons");
const getLocalCommands = require("../../utils/getLocalCommands");


module.exports = async(client, interaction)=>{
if(!interaction.isChatInputCommand()){
    const buttons = getButtons();
const buttonObject = buttons.find((button)=>button.name===interaction.customId);
buttonObject.callback(client, interaction);

    return;
}

const localCommands = getLocalCommands();
try {
    const commandObject = localCommands.find((cmd)=> cmd.name === interaction.commandName);

    if(!commandObject)return;
    if(commandObject.devOnly){
        if(!devs.includes(interaction.member.id)){
            interaction.reply({content: "nly developers are allowed to run this command", ephermal: true});
            return;
        }
        
    }
    if(commandObject.testOnly){
        if(!(interaction.guild.id===testServer)){
            interaction.reply({content: "This command cannot be ran here", ephermal: true});
            return;
        }
    }

if(commandObject.permissionsRequired?.lenght){
    for (const permission of commandObject.permissionsRequired){
        if(!interaction.member.permissions.has(permission)){
            
                interaction.reply({content: "You dont have enough permissions", ephermal: true});
                return;
            
        }
    }
}

if(commandObject.botPermissions?.lenght){
    for (const permission of commandObject.botPermissions){
        const bot = interaction.guild.members.me;
        if(!bot.permission.has(permission)){
            interaction.reply({content: "I dont have enough permissions", ephermal: true});
            return;
        }
    }
}
await commandObject.callback(client, interaction);
} catch (error) {
    console.log(error)
}
}