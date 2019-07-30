var discord = require('discord.js');
var config = require('./config');
var client = new discord.Client();
var fs = require('fs');
var commandsHandler = require('./commands');

var cumplesCache = [];

client.on('ready', function() {
   fs.readFile('cumples.json', function(error, data) {
      if(error) throw error;
      cumplesCache = JSON.parse(data);
      client.user.setActivity("la ruleta rusa");
   });
});

client.on('message', async function(message) {
    if(message.content.startsWith(config.prefix) === true) {
        var messageParts = message.content.split(' ');
        switch(messageParts[1]) {
            case 'nuevo':
                let nombre = messageParts[2];
                let fecha = messageParts[3];
                if(typeof nombre !== 'undefined' && typeof fecha !== 'undefined') {
                    // Lo agrego al json
                    cumplesCache.push({
                       "nombre" : nombre,
                       "fecha": Date.parse(fecha, 'd/m/Y')
                    });
                    await fs.writeFile('cumples.json', JSON.stringify(cumplesCache), async function(error) {
                        if(error) throw error;
                        respuesta = '\nCumplañito de ' + nombre + ' agregado!';
                        message.channel.send(respuesta);
                    });
                }else{
                    respuesta = `\n🚫 Formato incorrecto. \n\n**Usa** "cumpleanitobot, nuevo [nombre] [fecha dd/mm/YYYY]". **No acepto espacios en el nombre, gracias.**`;
                }
            break;

            case 'proximo':

            break;

            case 'todos':

            break;

            case 'ayuda':
            default:
                commandsHandler.showHelp(message);
            break;
        }
    }
});


client.login(config.token);