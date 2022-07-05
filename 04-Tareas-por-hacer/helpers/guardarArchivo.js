// Creamos un archivo para crear la funcion que usare para guardar archivos
const fs = require(`fs`) //Importamos el modulo para manejo de archivos

const archivo = `./db/data.json`;// Se usa .json porque la data que guardamos genera un json por lo tanto se vera mejor

const guardarDB = (data) =>{

    fs.writeFileSync(archivo, JSON.stringify(data)); // la data es lo que guardara en el archivo, pero solo permite cadenas de texto pot eso usamos el strigify
}

const leerDB = () => {

    if (!fs.existsSync(archivo)){// Verifico si existe algun archivo creado
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: `utf-8`}); // Hacemos la carga del archivo agregandole el encoding para que no me mande los bits
    const data = JSON.parse(info);  // Para recuperar el arreglo 

    //console.log(data);

    return data;
}

module.exports={
    guardarDB,
    leerDB
}