var discord         = require('discord.js');
var config          = require('./config');
var commandsHandler = require('./commands');
var client          = new discord.Client();

var masterDiscriminator = 5545;

client.on('ready', function() {
    client.user.setActivity("la ruleta rusa");
});

client.on('message', async function(message) {
    if(message.content.startsWith(config.prefix) === true) {
        var messageParts = message.content.split(' ');
        switch(messageParts[1]) {
            case 'nuevo':
                if(message.author.discriminator == masterDiscriminator)
                    commandsHandler.addCumpleanito(message, messageParts[2], messageParts[3]);
            break;

            case 'borrar':
                if(message.author.discriminator == masterDiscriminator)
                    commandsHandler.deleteCumpleanito(message, messageParts[2]);
            break;

            case 'proximo':
                commandsHandler.showProximo(message);
            break;

            case 'todos':
                commandsHandler.showAll(message);
            break;

            case 'ayuda':
            default:
                commandsHandler.showHelp(message);
            break;
        }
    }
});

client.login(config.token);