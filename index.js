const Discord = require("discord.js");

const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "+";

Client.on("ready", () => {
    console.log("bot opérationel");
})

Client.on("message", msg => {
    if(msg.author.bot) return;

    if(msg.member.hasPermission("ADMINISTRATOR")){
        if(msg.content.startsWith(prefix + "ban")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Tu n'a pas mentionnez de membre :/");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    msg.channel.send(mention.displayName + "a été bannie avec succès");
                }
                else {
                    msg.reply("Tu ne peut pas bannir ce membre :/");
                }
            }
        }
        else if(msg.content.startsWith(prefix + "kick")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Tu n'a mentionnez aucun membre")
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    msg.channel.send(mention.displayName + "Membre kick avec succès :)");
                }
                else {
                    msg.reply ("Tu ne peut pas kick ce membre")
                }
            }
        }
    }

    if(msg.content == prefix + "oof")
       msg.reply("Tes un gros oof");

       if(msg.content == prefix + "id")
       msg.reply("ton id est __**" + msg.author.id +"**__ **et ton pseudo est** " + msg.author.username )

       if(msg.content == prefix + "lourd")
       msg.reply("Lourddddd a sehbi");

       if(msg.content == prefix + "pub")
       msg.reply("voici le liens du serveur https://discord.gg/ZckGhT7WqK")

       if(msg.content.startsWith(prefix + "play")){
           if(msg.member.voice.channel){
               msg.member.voice.channel.join().then(connection => {
                  let args = msg.content.split(" ");
                  
                  let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio"}));

                  dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                  });

                  dispatcher.on("error", err => {
                      console.log("erreur de dispatcher : " + err );
                  });
               }).catch(err => {
                   msg.reply("Une erreur est survenue lors de la connexion.");
               })
           }
           else {
               msg.reply("Vous n'êtes pas connecté à un salon vocal.")
           }
       }
       
});

Client.login("ODM2MTgwMDUwMjM5ODE1NzEw.YIaPWw.-2H7MGM91u1C0WWGBw2SVuVwI1M");