const { v4: uuidv4 } = require('uuid'); // Modulo para crear id unica

class Tarea { // Clase a partir de la cual voy a crear mis tareas
    id = ``;
    desc = ``;
    completadoEn = null;

    constructor( desc ){ //Constructor que crea las tareas
        
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}


module.exports = Tarea; //Se exporta por defecto para no hacer la destructuracion