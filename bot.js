const Discord = require('discord.js');
const config = require('./auth.json');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Ready!');
});

const prefix = config.prefix;

bot.on('message', (message) => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command == 'tiger'){
		if (!message.mentions.users.size) {
			return message.reply('Falta mencionar')
				.then(msg => {
					msg.delete(10000)
				})
		}

		const member = message.mentions.members.first();

		if(member.selfMute == true){

			message.channel.send(message.member.user + ' utilizó La Llamada del Tigre contra ' + member.user + '. Es muy eficaz!!')
				.then(sms => {
					sms.delete(10000)
				})

			const oldChannel = member.voiceChannelID;

			const channel = message.guild.channels.get('401851363111469066');
			const channel2 = message.guild.channels.get('398970313301426177');

			for(i=0; i < 5; i++){

				if(i < 4){
					member.setVoiceChannel(channel);
					member.setVoiceChannel(channel2);
				}else if(i == 4){
					break;
				}		
			}

			member.setVoiceChannel(oldChannel);
		}
	}

	message.delete(0)

});

bot.login(process.env.BOT_TOKEN);
