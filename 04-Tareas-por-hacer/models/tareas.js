const Tarea = require("./tarea");

/*  _listado:
    { `uuid-156489: {id:12, desc: asdsd, completadoEn:46654}}
*/
class Tareas {

    _listado={};

    get listadoarr(){ //Usamos el get que hace que la funcion sea como una propiedad y volvemos la lista un arreglo

        const listado = [];

        Object.keys(this._listado).forEach( key => { //El objeto keys nos permite extraer las llaves del opbjeto en un arreglo, como es un arreglo utilizo la propiedad forEach para que barra el objeto
            const tarea = this._listado[key]; // Extraemos la tarea que esta en el key
            listado.push(tarea); // Lleenamos el arreglo con las tareas

        });

        return listado
    }


    constructor(){
        this._listado ={};
    }

    borrarTarea( id = ``){// Funcion para borrar tareas, recibe el id como argumento

        if (this._listado[id]){ // Si existe el listado con la propiedad id la borramos
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas =[] ){ 

        tareas.forEach((tarea) => { // Para cada elemento del arreglo acemos el llenado de _lista
            this._listado[tarea.id]=tarea;// Extraigo el id para llenar el listado y luego lo igualo a la tarea para que apunte a ella

        })
        

    }



    crearTarea(desc = ``){
        const tarea = new Tarea(desc);
        this._listado[tarea.id]=tarea; // tarea.id generado por el uuid va a apuntar a la tarea
    }

    listadoCompleto(){
        
        this.listadoarr.forEach((tarea) => { //Funcion para listar las tareas, se usa el geter listadoarr ya que me da un arreglo de las tareas. El forEach tiene como segundo argumento el indice
            let indice=this.listadoarr.indexOf(tarea)+1;
            //console.log(indice);
            let posicion=indice.toString()+".";
            (tarea.completadoEn)
                ? console.log(`${posicion.green} ${tarea.desc}  :: ${`Completada`.green}`)
                : console.log(`${posicion.green} ${tarea.desc}  :: ${`Pendiente`.red}`)
            //console.log(tarea.desc);
        })
    }

    listarPendientesCompletadas(completadas = true){
        const completadasArr = [], pendientesArr = [];

        this.listadoarr.forEach((tarea) => { //Funcion para listar las tareas, se usa el geter listadoarr ya que me da un arreglo de las tareas. El forEach tiene como segundo argumento el indice
            
            (tarea.completadoEn) //Extraigo las completadas y las pendientes en un arreglo cada una
                ?completadasArr.push(tarea)
                :pendientesArr.push(tarea)
        })
        if (completadas){ // Mostrar las completadas 
             let indice=0;
            completadasArr.forEach((completada)=>{
                indice=completadasArr.indexOf(completada)+1;
                let posicion=indice.toString()+".";
                console.log(`${posicion.green} ${completada.desc} :: ${completada.completadoEn.green}`)

            })
        }
         else{ //Mostrar las pendientes
            let indice=0; 
            pendientesArr.forEach((pendiente)=>{
            indice=pendientesArr.indexOf(pendiente)+1;
            let posicion=indice.toString()+".";
            console.log(`${posicion.red} ${pendiente.desc}`)

            })
        }
               
    }

    toggleCompletadas( ids=[] ){ // Funcion para marcar las completadas o pendientes

        ids.forEach( id => { //Barro el arreglo de Ids

            const tarea = this._listado[id]; // Extraigo la tarea del objeto listado a traves de la propiedad id 
            if (!tarea.completadoEn) { // Si la tarea no estaba completa ya realizo la modificacion 
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoarr.forEach( tarea => { // Ahora marco las completadas como pendientes

            if ( !ids.includes(tarea.id) ){//Si en mi arrreglo de ids que recibo del checkbox no aparece la tarea
              this._listado[tarea.id].completadoEn = null;// La marco como no completada
            } 

        })

    }

}

module.exports = Tareas;

