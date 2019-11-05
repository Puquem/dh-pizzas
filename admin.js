const fs = require ("fs");

const rutaDelArchivo = `${__dirname}/pedidos.json`;
let pedidos = fs.readFileSync(rutaDelArchivo, 'utf8');

if (pedidos.length > 0) {
    pedidos = JSON.parse(pedidos);

    console.log("¡Reporte generado con éxito!");
    console.log ("|===*** Reporte de ventas ***====|");

    let fecha = new Date ();

    console.log ("Fecha de generación: " + fecha.toLocaleDateString());
    console.log ("Hora: " + fecha.toLocaleTimeString());
    respuestas.fechaDelPedido = fecha.toLocaleDateString();
    respuestas.horaDelPedido = fecha.toLocaleTimeString();
    
    console.log ("|===*** Cantidad de pedidos realizados ***====|");
    console.log(`Total : ${pedidos.length}`);

    console.log ("|===*** Cantidad de pedidos para delivery ***====|");
    console.log(`Total : ${direccionCliente.length}`);

    console.log ("|===*** Cantidad de pizzas vendidas por gusto ***====|")
    
	let gustoMuzza = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Muzzarella';
	});
    console.log(`Total de Muzzarella: ${gustoMuzza.length}`);

    let gustoNapo = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Napolitana';
	});
    console.log(`Total de Napolitana: ${gustoNapo.length}`);

    let gustoJYM = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Jamón y Morrón';
	});
    console.log(`Total de Jamón y Morrón: ${gustoJYM.length}`);

    let gustoFugga = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Fugazzeta';
	});
    console.log(`Total de Fugazzeta: ${gustoFugga.length}`);
    

	
} else {
	console.log('Actualmente el sistema no tiene pedidos para generar el reporte.');
}
