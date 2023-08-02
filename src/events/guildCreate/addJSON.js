const fs = require("fs");
const path = require('path');
const directory = path.join('guilds.json')


module.exports=(client, interaction) => {
  const data = JSON.parse( fs.readFileSync(directory) );
  
  
  data.guilds.push({"id": interaction.id});
  fs.writeFileSync(directory, JSON.stringify(data), "utf-8")
  
  
 

}