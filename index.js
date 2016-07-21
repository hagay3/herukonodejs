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

bot.onTextMessage('היי',(message) => {
  //message.reply(message.body);

  const replyMessage =  Bot.Message.text("האם אתה גבר או אשה?");
  replyMessage.addResponseKeyboard(["אשה", "גבר"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/אשה|גבר/,(message) => {
  //message.reply(message.body);

  const replyMessage =  Bot.Message.text("האם אתה נשוי או שיש תאריך לחתונה?");

  if (p.getIsMan())
    replyMessage.addResponseKeyboard(["נשוי", "לא נשוי"]);
  else
    replyMessage.addResponseKeyboard(["נשואה", "לא נשואה"]);

  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/נשוי|לא נשוי|נשואה|לא נשואה/,(message) => {
  

  const replyMessage =  Bot.Message.text("מה מספר הילדים שלך?");

  replyMessage.addResponseKeyboard([0,1,2,3,4,5]);

  bot.send(replyMessage, message.from);

});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
