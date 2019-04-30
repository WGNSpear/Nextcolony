const Discord =require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const moment = require("moment");

//any requirements go here
module.exports.run = async (bot, message, args) => {

    if(!args[0]){
        return message.channel.send("Please include a planet ID. It looks like this: `P-ZTATYE85SD0`")
    }

    fetch(`https://nextcolony.io:5000/loadplanet?id=${args[0]}`, {
        // These properties are part of the Fetch Standard
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
        let planetembed = new Discord.RichEmbed()
            .setTitle("NextColony Planet Info")
            .setDescription(`This shows you the Planets buildings and their level + other info :)`)
            .setColor("#2a2a2a")
            .setThumbnail(`https://nextcolony.io/img/planets/${json.img}`)
            .addField("Galaxy", `**Planet Coordinates:**  ${json.planet_corx}/${json.planet_cory}\nHere's a link: [Click Here!](https://nextcolony.io/galaxy?x=${json.planet_corx}y=${json.planet_cory})`)
            .addField("Expansion", `**Base:** level ${json.level_base}\n**Research Centre:** level ${json.level_research}\n**Shipyard:** level ${json.level_ship}\n`)
            .addField("Coal", `**Mine:** level ${json.level_coal}\n**Depot:** level ${json.level_coaldepot}\n`)
            .addField("Ore", `**Balance:** level ${json.level_ore}\n**Depot:** level ${json.level_oredepot}\n`)
            .addField("Copper", `**Balance:** level ${json.level_copper}\n**Depot:** level ${json.level_copperdepot}\n`)
            .addField("Uranium", `**Balance:** level ${json.level_uranium}\n**Depot:** level ${json.level_uraniumdepot}\n`)
            .addField("Planet Specs", `**Planet Name:** ${json.planet_name}\n**Planet Rarity:** ${json.planet_rarity}\n**Planet Type:** ${json.planet_type}`)
            .addField("Owner", `[Click Here](https://steemit.com/@${json.user}/) for a link to the planet owners Steemit profile :)`)
            .setFooter("Bot made by Spear#0481")
            message.channel.send(planetembed)

        }).catch(err => console.log(err))



}

module.exports.help = {
    name: "pstats" //Must rename this to name of the file
}