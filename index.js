'use strict';
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
let handler = require('./handler');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
  username: 'botmaster36363',
  apiKey: '8d5fd56b-d95e-476c-ac5b-43d89c4a22ce',
  baseUrl: 'https://whispering-headland-51239.herokuapp.com/'
});

bot.updateBotConfiguration();

bot.onStartChattingMessage((message) => {
  bot.getUserProfile(message.from)
    .then((user) => {
      message.reply(`Hey ${user.firstName}!`);
    });
});

bot.onTextMessage('Hi',(message) => {
  //message.reply(message.body);

  const replyM =  Bot.Message.text("Are you a woman or a man?");
  replyM.addResponseKeyboard(["Woman", "Man"]);
  bot.send(replyM, message.from);

});

bot.onTextMessage(/Woman|Man/,(message) => {
  //message.reply(message.body);

  const replyM =  Bot.Message.text("How old are you?");
  replyM.addResponseKeyboard(["18-25", "26-35"]);
  bot.send(replyM, message.from);

});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
