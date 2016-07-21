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

  const replyMessage =  Bot.Message.text("Are you a woman or a man?");
  replyMessage.addResponseKeyboard(["I`m a Woman", "I`m a Man"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/Woman|Man/,(message) => {
  //message.reply(message.body);

  const replyMessage =  Bot.Message.text("Are you married or you have a wedding date?");

    replyMessage.addResponseKeyboard(["Married or have a wedding date", "Not married"]);

  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/Married|Not married/,(message) => {


  const replyMessage =  Bot.Message.text("How many childrens do you have?");

  replyMessage.addResponseKeyboard([0,1,2,3,4,5]);

  bot.send(replyMessage, message.from);

});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
