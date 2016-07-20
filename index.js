'use strict';
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'botmaster36363',
    apiKey: '8d5fd56b-d95e-476c-ac5b-43d89c4a22ce',
    baseUrl: 'https://whispering-headland-51239.herokuapp.com/'
});
bot.updateBotConfiguration();
bot.onTextMessage((message) = > {
    message.reply(message.body);
    //message.reply(message.body + "from: " + message.from + "id: " + message.id);
});
// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);


