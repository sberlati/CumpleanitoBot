var jsonHandler = require('./json');
var closestTo = require('date-fns/closest_to');
module.exports = {
    showHelp: function(messageInstance) {
        let respuesta  = `\n🎊 ** SUCH BIRTHDAY MUCH HAPPINESS ** 🎊\n\n`;
            respuesta += `**cumpleanitobot, ayuda:**    Muestra esto.\n`;
            respuesta += `**cumpleanitobot, todos:**    Muestra todos los cumpleañitos registrados.\n`;
            respuesta += `**cumpleanitobot, proximo:**  El cumpleañito más cercano a la fecha.\n`;
            respuesta += `**cumpleanitobot, nuevo [nombre] [fecha dd/mm/YYYY]:** Agrega un cumpleañito a la lista.\n\n`;
            respuesta += `👉 *ejemplo: cumpleanitobot, nuevo Chuche 12/03/1995*`;
        return messageInstance.channel.send(respuesta);
    },

    addCumpleanito: function(messageInstance, nombre, fecha) {
        if(typeof nombre !== "undefined" && typeof fecha !== "undefined") {
            jsonHandler.appendObject({
                'nombre': nombre,
                'fecha': fecha
            }).then((res) => {
                if(res === true) {
                    return messageInstance.channel.send('Cumpleañito de '+nombre+' agregado!');
                }else{
                    return messageInstance.channel.send('Error re loco: ' + res + '\n\nObvio que no se agregó el cumpleañito.');
                }
            });
        }else{
            return messageInstance.channel.send(
                `
                \n🚫 Formato incorrecto. 
                \n\n**Usa** "cumpleanitobot, nuevo [nombre] [fecha dd/mm/YYYY]". **No acepto espacios en el nombre, gracias.**
                `
            );
        }
    },

    showProximo: function(messageInstance) {
        jsonHandler.getFileContents().then((res) => {
            let hoy     = new Date(),
                elegido = null;

            res.forEach(function(obj) {
                if(elegido == null) 
                    elegido = obj;
                else{
                    let dateElegidoSplit = elegido.fecha.split('/'),
                        dateActualSplit  = obj.fecha.split('/');

                    let dateElegido = new Date(hoy.getFullYear(), dateElegidoSplit[1]-1, dateElegidoSplit[0]),
                        dateActual  = new Date(hoy.getFullYear(), dateActualSplit[1]-1, dateActualSplit[0]);

                    if(dateActual >= hoy) {
                        if(dateElegido > dateActual) {
                            elegido = obj;
                        }
                    }
                }
            });

            return messageInstance.channel.send(`
            \n ${elegido.nombre} es la próxima personita especial en cumplir años! **Cumple el ${elegido.fecha}**.
            \n Dildos ya tiene demasiados, no regalar uno nuevo.
            `);
        });
    }
};