const inquirer = require(`inquirer`);
const { validate } = require("uuid");
require(`colors`);
const preguntas =[  //Definimos el arreglo para ser usado por el inquirer
    {
        type: `list`,
        name: `opcion`,
        message: `Que desea hacer?`,
        choices: [
            {
                value: `1`,
                name:`${`1`.green}.Crear tarea`
            },
            {
                value: `2`,
                name: `${`2`.green}. Listar tareas`
            },
            {
                value: `3`,
                name: `${`3`.green}. Listar tareas completadas`
            },
            {
                value: `4`,
                name: `${`4`.green}. Listar tareas pendientes`
            },
            {
                value: `5`,
                name: `${`5`.green}. Completar tareas`
            },
            {
                value: `6`,
                name: `${`6`.green}. Borrar tarea`
            },
            {
                value: `0`,
                name: `${`0`.green}. Salir`
            }
        ]
    }
];

const question = [
    {
        type: `input`,
        name:`enter`,
        message: `\n Presione ${`ENTER`.green} para continuar \n`
    }
]

const inquirerMenu = async() =>{ //Menu de opciones

    console.clear();
    console.log(`=====================`.green);
    console.log(` Seleccione una opcion `.white);
    console.log(`=====================\n`.green);

    const { opcion } = await inquirer.prompt(preguntas); //Extraemos la opcion seleccionada del arreglo preguntas

    return opcion;

}

const pausa = async () => { //Funcion para pausar la aplicacion
    const question = [
        {
            type: `input`,
            name:`enter`,
            message: `\n Presione ${`ENTER`.green} para continuar \n`
        }
    ];
    console.log("\n");
    await inquirer.prompt(question); // Como esta el await la funcion espera a que se presione la tecla para continuar
    
}

const leerInput = async(message) =>{ // Funcion para pedirle al usuario que ingrese algo

    const question =[
        {
            type: `input`,
            name:`desc`,
            message, // El que le voy a mostrar al usuario segun sea el caso
            validate(value){ 
                if(value.lenght===0){
                    return `Por favor ingrese un valor`
                }
                return true
            }
        }
    ];

    const {desc}= await inquirer.prompt(question); // Extraigo el desc que es el nombre de la tarea
    return desc; // Devuelvo el nombre de la tarea

}

const listadoTareasBorrar = async( tareas = [] )=>{

    const choices = tareas.map( (tarea,i) => { // Usamos el map para crear el arreglo de las opciones del inquirer, el map me parmite acceder a las propiedades de la tarea

        const idx= `${i+1}.`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    });

    choices.unshift({ //Para añadir al inicio del arreglo la opcion 0 que es la de cancelar
        value: `0`,
        name: `0.`.green + `Cancelar`
    });


    const preguntas =[
        {
            type: `list`,
            name: `id`,
            message: `Borrar`,
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}   

const confirmar = async (message) =>{ // Funcion para confirmar una accion, se usa el inquirer en confirm

    const question = [
        {
            type: `confirm`,
            name: `ok`,
            message
        }
    ];

    const {ok} = await inquirer.prompt(question); //El confirm devuelve un valor booleano
    return ok;

}

const mostrarListadoChecklist = async( tareas = [] )=>{// Funcion para seleccionar las tareas completadas y las pendientes

    const choices = tareas.map( (tarea,i) => { // Usamos el map para crear el arreglo de las opciones del inquirer, el map me parmite acceder a las propiedades de la tarea

        const idx= `${i+1}.`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false // Se agrega la propiedad del checkbox, si esta completada se selecciona sino no
        }

    });

    const pregunta =[
        {
            type: `checkbox`, //Regresa un arreglo con los elementos seleccionados
            name: `ids`,
            message: `Seleccione`,
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}  

module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}