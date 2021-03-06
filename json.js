var fs = require('fs');

module.exports = {
    /**
     * El nombrel JSON donde voy a almacenar
     * los cumpleañitos.
     */
    cumpleanitosFilename: 'cumples.json',

    /**
     * Recibo un objeto JSON y lo agrego al array
     * de objetos que ya tengo con los demás
     * cumpleañitos en este caso.
     * @param object
     */
    appendObject: function(object) {
        return new Promise((resolve, reject) => {
            this.getFileContents().then((data) => {
                data.push(object);
                fs.writeFile(
                    this.cumpleanitosFilename,
                    JSON.stringify(data),
                    (err) => {
                        if(err) {
                            reject(err);
                        }else{
                            resolve(true);
                        }
                    }
                );
            });
        });
    },

    removeObjectByNombre: function(nombre) {
        return new Promise((resolve, reject) => {
            this.getFileContents().then((data) => {
                var newData = data;
                data.forEach((obj, i) => {
                    if(obj.nombre == nombre) {
                        newData.splice(i, 1);
                    }
                });
                fs.writeFile(
                    this.cumpleanitosFilename,
                    JSON.stringify(newData),
                    (err) => {
                        if(err)
                            reject(err);
                        else
                            resolve(true);
                    }
                );
            });
        });
    },

    /**
     * Obtengo el contenido del archivo y lo parseo a
     * JSON.
     */
    getFileContents: function() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.cumpleanitosFilename, (err, data) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(JSON.parse(data));
                }
            });
        });
    }
};