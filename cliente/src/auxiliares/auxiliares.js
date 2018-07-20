const self = {}


//FUNCIONES AUXILIARES

//Traduce la condición al español
self.traducirCondicion =  function(condicion){
    var traduccion;
    condicion==="new"?traduccion="Nuevo":traduccion="Usado"
    return traduccion
}

//Imprime el precio en el formato correcto y evita que los productos con precio a convenir salgan como "0"
self.imprimirPrecio = function(precio){
	if(precio===0){
		return "Precio a convenir"
	}else{
		return precio.toLocaleString('de-DE')
	}
}

//Imprime el símbolo correspondiente a la moneda de la publicación
self.elegirMoneda = function(moneda){
    var simbolo;
    if(moneda==="USD"){
    	simbolo="U$S "
    }else if(moneda==="ARS"){
    	simbolo="$ "
    }else{
    	simbolo===moneda //Sirve para los casos de "precio a convenir" (que se usa en servicios, por ejemplo, "contador") y para el caso eventual de que se permita la publicación de algo en otra moneda.
    }
    return simbolo
}

self.agregarSimbolo = function(items,index){
    var cantidad = items.length - 1
    if(index!==cantidad){
        return " >"


     }
}
module.exports = self;