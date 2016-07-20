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

bot.onTextMessage((message) => {
    handler.message1();
    message.reply(message.body);
    message.addResponseKeyboard(["Yes","No"], false, "sexyz22")
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);