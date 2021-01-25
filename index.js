const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : '';
const welcomeChannelName = "welcome";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "welcome to 3D project server!";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!helpbot를 쳐보세요.' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "guest"));
});


client.on('message', (message) => {
  
  if (message.content.startsWith('!ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
  // If the message content starts with "!kick"
  if (message.content.startsWith('!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }

  
  if(message.author.bot) return;
  if(message.content == '!관리자') {
    message.reply('@GamerK');
    let img = 'https://data.ac-illust.com/data/thumbnails/89/8931d6f5916ade8eb2fe2c1b4ba226b3_t.jpeg';
    let embed = new Discord.RichEmbed()
      .setTitle('관리자 호출')
      .setAuthor('GamerK 2', img, '')
      .setColor('#186de6')
      .setThumbnail(img)
      .addBlankField()
      .addField('Warning', '관리자가 못 올수도 있습니다')
      .addField('Warning', '호출 사유가 불분명하면 밴 되므로 주의하세요')
      .addBlankField()
      .setTimestamp()
      .setFooter('GamerK 2', img)

    message.channel.send(embed)
  }
  if(message.content == 'ping') {
    message.channel.send('pong');
      }
  if(message.content == '!si') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/avatars/664784922875265024/04935bda2381b0166f5fbfe41671ca05.webp?size=128';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('server info of 3D BOT', img)
    embed.setFooter(`3D BOT`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }
    
  if(message.content == '!전체공지') {
    let img = 'https://cdn.discordapp.com/avatars/664784922875265024/04935bda2381b0166f5fbfe41671ca05.webp?size=128';
    let embed = new Discord.RichEmbed()
      .setTitle('공지사항')
      .setAuthor('GamerK 2', img, '')
      .setColor('#186de6')
      .setThumbnail(img)
      .addBlankField()
      .addField('2020/10/25 1번째 공지', 'mindustry 3D project server is opened!')
      .addField('Inline field title', '1.we need supporter for this server  \n2.If you want suggest idea, go to #suggestions')
      .addBlankField()
      .setTimestamp()
      .setFooter('GamerK 2', img)

    message.channel.send(embed)
  } else if(message.content == '!helpbot') {
    let helpImg = 'https://cdn.discordapp.com/avatars/769535992087576587/8cb755f84f026dabbe07850ba4edb021.webp?size=128';
    let commandList = [
      {name: '!helpbot', desc: '봇 명령어 도움말'},
      {name: '!전체공지 또는 !긴급공지', desc: '관리자용 공지 명령어'},
      {name: '!kick + @ + 유저 닉네임', desc:'관리자용 유저 킥 명령어'},
      {name: '!ban + @ + 유저 닉네임', desc:'관리자용 유저 밴 명령어'},
      {name: '!청소 + 숫자', desc:'관리자용 채팅 내용 청소'},
      {name: '!rank', desc: 'MEE6봇이 당신의 랭크를 띄웁니다 '},
      {name: '!초대코드', desc:'초대코드 발급받기'},
      {name: '!관리자', desc:'관리자를 호출할 수 있습니다(평일엔 못 갈 수도 있음),호출 사유가 불분명하면 경고 당하므로 주의하세요' },
      {name: '!dice [정수] [정수] 또는 !dice [정수]', desc:'일정한 수를 랜덤으로 돌리는 명령어'}
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 3D BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`Made by GamerK 2`)
      .setTimestamp()
    
      commandList.forEach(x => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
      });
  
      embed.addField('Commands: ', commandStr);
  
      message.channel.send(embed)
    } else if(message.content == '!초대코드') {
      message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        });
    }
    if(message.content.startsWith('!긴급공지')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('!긴급공지'.length);
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(`<@${message.author.id}> ${contents}`);
        });
    
        return message.reply('긴급공지를 전송했습니다.');
      } else {
        return message.reply('채널에서 실행해주세요.');
      }
    }
  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  } 
});



function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);