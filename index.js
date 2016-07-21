'use strict';
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
let handler = require('./handler');
let Person = require('./person');

let per = new Person();
/*per.setKids = 3;
console.log(per.getKids);
 per.display();*/

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

  const replyMessage =  Bot.Message.text("Are you a woman or a man?");
  replyMessage.addResponseKeyboard(["I`m a Woman", "I`m a Man"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/Woman|Man/,(message) => {

  per.setIsMale = message.body === "I`m a Man" ? true : false;

  const replyMessage =  Bot.Message.text("Are you married or you have a wedding date?");
  replyMessage.addResponseKeyboard(["Married", "Not married","Have a wedding date"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/Married|Not\smarried|Have\sa\swedding\sdate/,(message) => {

  per.setMarried = message.body === "Not married" ? false : true;

  const replyMessage =  Bot.Message.text("How many childrens do you have?");
  replyMessage.addResponseKeyboard(["0","1","2","3","4","5"]);
  bot.send(replyMessage, message.from);

});


bot.onTextMessage(/^0$|^1$|^2$|^3$|^4$|^5$/,(message) => {

  per.kids = message.body;

  const replyMessage =  Bot.Message.text("Do you have a manager inssurance before 2001?");
  replyMessage.addResponseKeyboard(["I have","I don't have"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/I have|I\sdon't\shave/,(message) => {

  per.setHasOldMI = message.body === "I have" ? true : false;

  const replyMessage =  Bot.Message.text("Do you believe in the next 30 years humans will live up to age 100 ?");
  replyMessage.addResponseKeyboard(["Will live","Won't live"]);
  bot.send(replyMessage, message.from);

});


bot.onTextMessage(/live/,(message) => {

  per.oldAge = message.body === "Will live" ? true : false;

  const replyMessage =  Bot.Message.text("What is your salary?");
  replyMessage.addResponseKeyboard(["Under 20K","Above 20K"]);
  bot.send(replyMessage, message.from);

  per.lowSalary = message.body === "Under 20K" ? true : false;

  console.log(handler.calc(per));


});
// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
