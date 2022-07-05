require (`colors`);
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {inquirerMenu, 
        pausa ,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require("./helpers/inquirer"); //Importamos desde inquirer
const Tareas = require("./models/tareas");

console.clear();


const main = async() => {  //Creamos esta funcion async para poder usar libremente el await

    let opt=``;
    const tareas= new Tareas();// Llamo al constructor de mi clase Tarea 

    const tareasDB = leerDB();

    if (tareasDB){ //Cargamos las tareas
        tareas.cargarTareasFromArray(tareasDB);      

    }


    do{ //Ciclo para que la app se mantenga en ejecucion
        opt = await inquirerMenu(); //Opteniendo la opcion en una variable
        //console.log({opt});
     
        switch (opt){   // Switch para cada una de las opciones
            case `1`:  //Crear Tarea

                const desc = await leerInput(`Descripcion:`);
                tareas.crearTarea(desc); //Creo la tarea usando el metodo de mi clase Tareas
            break;

            case `2`://Listar todas las tareas
                tareas.listadoCompleto();
                //console.log(tareas.listadoarr);
            break;

            case `3`://Listar completadas
              tareas.listarPendientesCompletadas();
            break;

            case `4`:// Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case `5`://Completado || Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoarr);// Recibimos el arreglo de ids del checkbox
                tareas.toggleCompletadas(ids);
            break;

            case `6`://Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoarr); //Usando el inquirer creamos la lista de tareas a borrar devolviendo el id de la que se va a borrar El await es para esperar que termine la funcion y poder retornar el id
               if (id !== `0`){ //Si no se selecciona la opcion cancelar, se realiza el borrado
                    const ok = await confirmar(`Esta seguro?`); //Llamada de la funcion confirmar
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(`Tarea borrada`);
                    }
                }
            break;
            
        }

        guardarDB(tareas.listadoarr);

        await pausa();
    
    } while (opt!==`0`);
     
}

main();
