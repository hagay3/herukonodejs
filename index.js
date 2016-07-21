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

  const replyMessage1 =  Bot.Message.text("Hey "+message.from + ", I will ask you a series of questions in order to recommend a personalize retirement plan.");

  const replyMessage =  Bot.Message.text("Are you a woman or a man?");
  replyMessage.addResponseKeyboard(["I`m a Woman", "I`m a Man"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage('Hi',(message) => {
  //message.reply(message.body);

  const replyMessage1 =  Bot.Message.text("Hey "+message.from + ", I will ask you a series of questions in order to recommend a personalize retirement plan.");

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

  const replyMessage =  Bot.Message.text("Do you have a manager inssurance issued before May 2001?");
  replyMessage.addResponseKeyboard(["I have","I don't have"]);
  bot.send(replyMessage, message.from);

});

bot.onTextMessage(/I have|I\sdon't\shave/,(message) => {

  per.setHasOldMI = message.body === "I have" ? true : false;

  const replyMessage =  Bot.Message.text("Do you believe that 30 years from now the life expectancy will be 90 years?");
  replyMessage.addResponseKeyboard(["Yes","No"]);
  bot.send(replyMessage, message.from);

});


bot.onTextMessage(/Yes|No/,(message) => {

  per.oldAge = message.body === "Yes" ? true : false;

  const replyMessage =  Bot.Message.text("What is your salary?");
  replyMessage.addResponseKeyboard(["Under 20K","Above 20K"]);
  bot.send(replyMessage, message.from);

  per.lowSalary = message.body === "Under 20K" ? true : false;

});


bot.onTextMessage(/20K/,(message) => {

  const recommendation =  Bot.Message.text(handler.calc(per));
  bot.send(recommendation, message.from);

});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
