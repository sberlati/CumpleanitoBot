var discord         = require('discord.js');
var commandsHandler = require('./commands');
var client          = new discord.Client();
var express         = require('express');
var app             = express();

var masterDiscriminator = process.env.masterDiscriminator;

client.on('ready', function() {
    client.user.setActivity("la ruleta rusa");
});

client.on('message', async function(message) {
    if(message.content.startsWith(process.env.prefix) === true) {
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

client.login(process.env.discordToken);

app.get('/', (req, res) => {res.json({"wow":true});});
app.listen(process.env.PORT || 5050, () => {console.log("Iniciado WS")});