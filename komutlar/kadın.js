const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
let kayityetkili = '758444338619088908' //Yetkili
let codeariusver = '758449211620196413' //Verilecek
let codeariusver2 = '759128221429792779' //Verilecek
let codeariusal = '758449598313398312' //Alınacak
let isimön = '★' //İsmin önüne gelecek simge,tag   

  if(!message.member.roles.cache.has(kayityetkili))  //CodeArius
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2] //CodeArius
  if (!member) return message.channel.send('Bir üye etiketlemelisin.')
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') //CodeArius
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${isimön} ${isim} ${yaş}` //CodeArius
  //CodeArius
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.roles.add(codeariusver)
  },2000)
      setTimeout(function(){
  member.roles.add(codeariusver2)
  },2000)
  setTimeout(function(){
  member.roles.remove(codeariusal)
  },3000)
 //CodeArius
let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) || '0'
const emoji = client.emojis.cache.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) //CodeArius
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)  //CodeArius
  let embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(`${member} kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> rolü verildi.

<@!${message.author.id}> **Kişisinin toplam** ${toplam} **adet teyiti oldu.**
`)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Yeni Kız kayıt yapıldı ')
  .setThumbnail("https://cdn.discordapp.com/avatars/762393875242811453/90140b3f6dd28a92166f385163113ef7.png?size=1024")
message.channel.send(embed)
  }  //CodeArius
  if(kayıtlımı === 'evet') {
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Yeni kız kayıt yapildi')  //CodeArius
  .setThumbnail("https://cdn.discordapp.com/avatars/762393875242811453/90140b3f6dd28a92166f385163113ef7.png?size=1024")
message.channel.send(embed)
  }
};  //CodeArius

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kız'],
  permLevel: 0
}
exports.help = {
  name: 'k',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}