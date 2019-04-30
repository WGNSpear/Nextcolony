const Discord =require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const moment = require("moment");

//any requirements go here
module.exports.run = async (bot, message, args) => {

    if(!args[0]){
        return message.channel.send("Please include a planet ID. It looks like this: `P-ZTATYE85SD0`")
    }

    fetch(`https://nextcolony.io:5000/loadqyt?id=${args[0]}`, {
        // These properties are part of the Fetch Standard
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {

            let update = moment(json.lastUpdate).format("h:mm:ss a");
            let resourceembed = new Discord.RichEmbed()
                .setTitle("NextColony Planet Resources")
                .setColor("#2a2a2a")
                .addField("Coal", `**Balance:** ${json.coal}\n**Production /Day:** ${json.coalrate}\n**Depot:** ${json.coaldepot}\n`)
                .addField("Ore", `**Balance:** ${json.ore}\n**Production /Day:** ${json.orerate}\n**Depot:** ${json.oredepot}\n`)
                .addField("Copper", `**Balance:** ${json.copper}\n**Production /Day:** ${json.copperrate}\n**Depot:** ${json.copperdepot}\n`)
                .addField("Uranium", `**Balance:** ${json.uranium}\n**Production /Day:** ${json.uraniumrate}\n**Depot:** ${json.uraniumdepot}\n`)
                .addField("Whats with the Delay?", `This planets Stats were last updated at ${update} so your resources may be off.\nAlso, the nextcolony website is slow to load so the bot can take a while to reply. Sorry!`)
                .setFooter("Bot made by Spear#0481")
            message.channel.send(resourceembed)
            }
        ).catch(err => console.log(err))
}

module.exports.help = {
    name: "rstats" //Must rename this to name of the file
}
