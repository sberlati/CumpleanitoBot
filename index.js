var discord = require('discord.js');
var config = require('./config');
var client = new discord.Client();
var fs = require('fs');

var cumplesCache = [];

client.on('ready', function() {
   fs.readFile('cumples.json', function(error, data) {
      if(error) throw error;
      cumplesCache = JSON.parse(data);
      client.user.setActivity("Error :^(");
   });
});

client.on('message', function(message) {
    if(message.content.startsWith(config.prefix) === true) {
        var messageParts = message.content.split(' ');
        var respuesta = 'Whoops!';
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
                    fs.writeFile('cumples.json', JSON.stringify(cumplesCache), function(error) {
                        if(error) throw error;
                        respuesta = '\nCumplañito de ' + nombre + ' agregado!';
                    });
                }else{
                    respuesta = `\n🚫 Formato incorrecto. \n\n**Usar** "cumpleanitobot, [nombre] [fecha dd/mm/YYYY]". **No acepta espacios en el nombre.**`;
                }
            break;

            case 'proximo':

            break;

            case 'todos':

            break;

            case 'ayuda':
            default:
                respuesta  = `\n🎊 ** SUCH BIRTHDAY MUCH HAPPINESS ** 🎊\n\n`;
                respuesta += `**cumpleanitobot, ayuda:** Muestra esto.\n`;
                respuesta += `**cumpleanitobot, todos:** Muestra todos los cumpleañitos registrados.\n`;
                respuesta += `**cumpleanitobot, proximo:** El cumpleañito más cercano a la fecha.\n`;
                respuesta += `**cumpleanitobot, nuevo [nombre] [fecha dd/mm/YYYY]:** Agrega un cumpleañito a la lista.\n\n`;
                respuesta += `👉 *ejemplo: cumpleanitobot, nuevo Chuche 12/03/1995*`;
            break;
        }
        message.channel.send(respuesta);
    }
});


client.login(config.token);