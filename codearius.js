const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const queue = new Map();


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Hostlandı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

//KAYIT MESAJ
//NOT Kendi isteğinize göre burada ki yazıları değiştirin!
client.on("guildMemberAdd", (member, message) => {
  const sunucuid = "758432300877873222"; //Sunucu id
  const id = "758432913866883095"; //Kanal id
  const jail = "759103682070970421"; //jail rol id
  const kayıtsız = "758449598313398312"; //Kayıtsız rol id
  let resim = "https://cdn.discordapp.com/avatars/762393875242811453/90140b3f6dd28a92166f385163113ef7.png?size=1024"
  if (member.guild.id !== sunucuid) return;
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
  const channel = member.guild.channels.cache.get(id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
   var kontrol;
  if (gün < 14) {
    kontrol = "Güvenilmeyen Kullanıcı!";
    member.roles.add(kayıtsız)
  }
  if (gün > 14) {
    kontrol = "Güvenilir Kullanıcı!";
    member.roles.add(kayıtsız)
  }
  
  let codearius = new Discord.MessageEmbed()
  .setAuthor(`Yeni birisi spawn oldu!`)
  .setDescription(`**Hoşgeldin!** ${member}

seninle beraber **${member.guild.members.cache.size}** kişiyiz!

Kayıt olmak için <@&758444338619088908> rolündeki yetkilileri etiketlemeyi unutma.`)
  .addField('Hesap Oluşturma Tarihi', `\`${moment(user.createdAt).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(user.createdAt).format("YYYY")}\``, true)
  .addField('Bu Hesap', `\`${kontrol}\``, true)
  .setThumbnail(resim)
  .setColor('BLUE')
  .setTimestamp()
  channel.send(codearius);
  
});
//

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
client.login(ayarlar.token);

///////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam, Hoşgeldin ^^');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply(' Aleyküm Selam, Hoşgeldin ^^');
  }
});

client.on("message", msg => {
  if (msg.content === "tag") {
    msg.channel.send("★");//Tagınızı yazın
     }
});
///////////////////////////////////////////////////Tag rol sistemi

