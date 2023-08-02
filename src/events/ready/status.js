const {ActivityType}=require("discord.js");

module.exports = (client, interaction)=>{
    let status = [
        {
            name: '/help',
            type: ActivityType.Playing,
        },
        {
            name: 'Coded by Simi',
            type: ActivityType.Playing,
        },
        {
          name: '/create',
          type: ActivityType.Playing,
        },
        {
            name: 'Tickets',
            type: ActivityType.Playing,
        },
      ];
      setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 10000);
}