// Es necesario tener la libreria instalada antes (npm install inquirer -- save) El manual de esta librería está en https://github.com/SBoudrias/Inquirer.js

const inquirer = require ('inquirer');
const fs = require ("fs");

// prompt recibe un array de preguntas, cada pregunta será un objeto literal. 
// then recibe una función, esta función toma como parámetro las respuestas a las preguntas del método prompt.
// type es el tipo de ingreso, input es un ingreso manual, rawlist es un listado de opciones.

const preguntas = [
    { type: 'confirm',
    message: '¿La pizza es para llevar?',
    name: 'esParaLlevar',
    default: false,
  }, 
    { 
    type: 'input',
    message: 'Ingresá la calle, altura, piso y departamento:',
    name: 'direccionCliente',
    when: (respuestas) =>{
      return respuestas.esParaLlevar===true;
    }, 
    validate: (estaRespuesta) => { let longitud = estaRespuesta.length;
    if (longitud <= 5) { 
      return "Dejanos saber tu dirección para entregar el pedido";}
    return true;
    },
  }, 
    { 
    type: 'input',
    message: 'Ingresá tu nombre:',
    name: 'nombreCliente',
    validate: (estaRespuesta) => {
      if (estaRespuesta.length < 1) { 
        return "Por favor, ingresá tu nombre";
      } else if (!isNaN (estaRespuesta))
         { return "Por favor, ingresá tu nombre";
      }
      return true;
    },
  }, 
    {
    type: 'input',
    message: 'Ingresá tu número de teléfono:',
    name: 'telefonoCliente',
    validate: (estaRespuesta) => {
      if (estaRespuesta.length < 7) { 
        return "Por favor, ingresá tu número de teléfono";
      } else if (isNaN (estaRespuesta))
         { return "Ingresá solo números";
      }
      return true;
    },
  },
    {
    type: 'rawlist',
    message: 'Elegí el gusto de tu pizza:',
    name: 'gustoPizza',
    choices: ['Muzzarela', 'Napolitana', 'Jamón y Morrón', 'Fugazzeta'],
    default: 'Muzzarela',
  },
    {
    type: 'list',
    message: 'Elegí el tamaño de la pizza:',
    name: 'tamanoPizza',
    choices: ['Personal', 'Mediana', 'Grande'],
    default: 'Grande',
  },
    { 
    type: 'confirm',
    message: '¿Querés agregar una bebida?',
    name: 'agregarBebida',
    default: false,
  },
    {
    type: 'list',
    message: 'Elegí el gusto de la bebida:',
    name: 'gustoBebida',
    choices: ['Agua','Coca-Cola', 'Pepsi', 'Sprite', '7Up' , 'Fanta' , 'Mirinda'],
    default: 'Coca-Cola',
    when: (respuestas) =>{
      return respuestas.agregarBebida===true;
    },
  },
    { 
    type: 'confirm',
    message: '¿Sos cliente habitual?',
    name: 'clienteHabitual',
    default: false,
  },
    {
    type: 'checkbox',
    message: 'Por ser cliente habitual te regalamos 3 empanadas. ¿Qué gusto de empanadas querés?:',
    name: 'gustoEmpanadas',
    choices: ['Carne', 'Jamón y Queso', 'Pollo', 'Humita', 'Queso y Cebolla', 'Cantimpalo'],
    when: (respuestas) =>{
      return respuestas.clienteHabitual===true;
    },
    validate: (estaRespuesta) => {
      if (estaRespuesta.length != 3) { 
        return "Sólo es posible elegir 3 empanadas";
      } 
        return true;
    },
  },
  ];
  
    
  console.log('Bienvenido a DH Pizzas. Estamos listos para tomar tu pedido');

  inquirer
  .prompt(preguntas)
  .then(function (respuestas) {

    let fecha = new Date ();

    console.log ("Fecha: " + fecha.toLocaleDateString());
    console.log ("Hora: " + fecha.toLocaleTimeString());
    respuestas.fechaDelPedido = fecha.toLocaleDateString();
    respuestas.horaDelPedido = fecha.toLocaleTimeString();

    console.log ("==== Resumen de tu pedido ====");
    console.log ("Tus datos son - Nombre: "+ respuestas.nombreCliente + "| Teléfono: " + respuestas.telefonoCliente);
    if (respuestas.direccionCliente === true) { 
      console.log ("Tu pedido será entregado en:" + respuestas.direccionCliente);
    } else {
       console.log ("Nos indicaste que pasarás a retirar tu pedido");
    };
    console.log ("==== Productos solicitados ====");
    console.log ("Pizza: " + respuestas.gustoPizza);
    console.log ("Tamaño: " + respuestas.tamanoPizza);
    if (respuestas.agregarBebida) { 
      console.log ("Bebida: " + respuestas.gustoBebida);
    } else {
    };
    if (respuestas.gustoEmpanadas) { 
      console.log ("Tus tres empanadas de regalo serán de: ");
      for (const empanadas of respuestas.gustoEmpanadas) {
				console.log("    • " + empanadas);
			};
    };
    let precioPizza = 0;
    let precioBebida = 0;
    let descuento = 0;

    if (respuestas.agregarBebida) {
      precioBebida = 80;
    };
    switch (respuestas.tamanoPizza.toLowerCase()) {
			case 'personal':
				descuento = respuestas.agregarBebida ? 3 : 0;
				precioPizza = 430 + precioBebida;
				break;
			case 'mediana':
				descuento = respuestas.agregarBebida ? 5 : 0;
				precioPizza = 560 + precioBebida;
				break;
			default:
				descuento = respuestas.agregarBebida ? 8 : 0;
				precioPizza = 650 + precioBebida;
				break;
		};
    console.log('===============================');
    console.log('Total productos: $ ' + precioPizza);
        if (respuestas.esParaLlevar) {
        console.log('Total delivery: $20');
        precioPizza += 20;
    };
    
    let precioFinal = precioPizza - (precioPizza * descuento) / 100;
    
    console.log('Descuentos: '+ descuento + '%');
    console.log('TOTAL: ' + precioFinal);
    console.log('===============================');
    console.log('Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido.');

    const rutaDelArchivo = __dirname + "/pedidos.json";
    let contenidoPedidos = fs.readFileSync (rutaDelArchivo, "utf8");
    contenidoPedidos = contenidoPedidos.length > 0 ? JSON.parse(contenidoPedidos) : [],
    
    respuestas = {
      idPedido: contenidoPedidos.length + 1,
      ...respuestas,
      totalPedido: precioFinal,
      descuento: descuento,
    };

    contenidoPedidos.push(respuestas);

    let dataFinal = JSON.stringify(contenidoPedidos, null, " ");

    fs.writeFileSync(rutaDelArchivo, dataFinal);

    console.log("Se guardó su pedido!");

    //console.log (contenidoArchivo);
    //console.log (typeof contenidoArchivo);
});