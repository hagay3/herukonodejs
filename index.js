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

bot.onTextMessage('Hi bot',(message) => {
  //message.reply(message.body);

  const replyMessage =  Bot.Message.text("Are you a woman or a man?");
  replyMessage.addResponseKeyboard(["Woman", "Man"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/Woman|Man/,(message) => {
  //message.reply(message.body);

  const replyMessage =  Bot.Message.text("How old are you?");
  replyMessage.addResponseKeyboard(["18-25", "26-45"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/18-25|26-45/,(message) => {כ 
  let replyMessage;

  if (message.body === "^18-25$"){
    replyMessage =  Bot.Message.text("Im recommend you to buy מנורה מבטחים");
  } else {
    replyMessage =  Bot.Message.text("Im recommend you to buy ילין מבטחים");
  }
  bot.send(replyMessage, message.from);

});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
