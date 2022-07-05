require (`colors`);

const mostrarMenu = () =>{
    return new Promise( resolve => { //Creo una promessa para devolver la opcion ingresada
        console.clear();
        console.log(`=====================`.green);
        console.log(` Seleccione una opcion `.green);
        console.log(`=====================\n`.green);

        console.log(`${`1.`.green} Crear tarea`);
        console.log(`${`2.`.green} Listar tareas`);
        console.log(`${`3.`.green} Listar tareas completadas`);
        console.log(`${`4.`.green} Listar tareas pendientes`);
        console.log(`${`5.`.green} Completar tarea`);
        console.log(`${`6.`.green} Borrar tarea`);
        console.log(`${`0.`.green} Salir\n`);

        const readline = require(`readline`).createInterface({  
            input: process.stdin,  // Pedir datos al usiario
            output: process.stdout // Mostrar mensaje al usuario

        }); //Preparamos la interfaz para recibir datos del usuario, readline ses un paquete propio de node

        readline.question(`Seleccione una opcion: `,( opt ) => {
                readline.close();
                resolve(opt);
        })  // Para el stdout, recibimos la opcion con opt
        
    });
    
}

const pausa = () => { //Funcion para mantener corriendo la aplicacion 
    return new Promise (resolve =>{
        const readline = require (`readline`).createInterface({  
            input: process.stdin,  
            output: process.stdout
    
        }); 
        readline.question(`\n Presione ${`ENTER`.green} para continuar \n`,( opt ) => {
                readline.close();
                resolve();
        })  
    })
    
    
}


module.exports={  //Exportamos un objeto porque es probable que se tengan mas funciones dentro
    mostrarMenu,
    pausa
}
