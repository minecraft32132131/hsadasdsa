const Discord = require('discord.js');
const db = require('quick.db')
 //CodeArius
exports.run = async (client, message, args) => {
  let kayityetkili = '758432800138985472' //Kayıt yetkilisi İD
  if(!message.member.roles.cache.has(kayityetkili)) 
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
   //CodeArius
  let member = message.mentions.users.first();
    if(!member) return message.channel.send('Bir kişiyi etiketlemelisin')
    let codeariuseski = await db.fetch(`eskiad_${member.id}`) || 'Eski ismi yok'
    let toplamik = await db.fetch(`toplamik_${member.id}`) || '0'
    let kayıtlılar = new Discord.MessageEmbed()
      .setColor('f5f5f5') //CodeArius
      .setAuthor(`${member.tag}`, member.avatarURL())
      .setDescription(`Bu üyenin toplamda \`${toplamik}\` isim kayıtı bulundu:

\`${codeariuseski.join('\n')}\``)
      .setThumbnail('https://cdn.discordapp.com/attachments/770936308897808404/773477459248283648/Rebilius5.gif')
    message.channel.send(kayıtlılar) //CodeArius
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'isimler',
  description: "kişinin eski isimlerini gösterir",
  usage: 'isimler @kişi'
}