const service = {}
var axios = require('axios')

//Retorna el array de categorías para hacer el breadcrumb
service.categorizar = function(query,response){
  var filtroCategorias = response.data.filters[0]
  //Resuelvo los casos en el que filters viene vacío. Cuando pasa, mando el nombre de la query
  if(filtroCategorias === undefined){
    var categorias=[query]
  //En los otros casos, mando el array con los nombres de categorías
  }else{
    var objetosCategorias = response.data.filters[0].values[0].path_from_root
    var categorias=[];
    for(i=0;i<objetosCategorias.length;i++){
      categorias.push(objetosCategorias[i].name)
    }
    
  }
  return categorias
}

//Retorna el array con los cuatro ítems que va a mostrar el resultado de búsqueda
service.obtenerItems = function(response){
	var items = []
  for(i=0;i<4;i++){

    //Crea el objeto de cada item con el formato solicitado
    var item = {
          id:response.data.results[i].id,
          title:response.data.results[i].title,
          price:{
            currency:response.data.results[i].currency_id,
            amount:Math.floor(response.data.results[i].price),
            decimals:service.calculoDecimales(response.data.results[i].price) 
          },
          picture:response.data.results[i].thumbnail,
          condition:response.data.results[i].condition,
          free_shipping:response.data.results[i].shipping.free_shipping,
          location:response.data.results[i].address.state_name
        }
    items.push(item)
  }
  return items
}


//Retorna la descripción de un producto individual
service.obtenerDescripcion = function(producto){
  return axios.get('https://api.mercadolibre.com/items/'+producto+'/description')
          .then(function(response){
            return response
          })
          .catch(function(error){ //Evita que el axios.all completo se vaya por el catch si la búsqueda de descripción devuelve un 404 (pasa, por ejemplo, con este producto: https://api.mercadolibre.com/items/MLA732200831/description)
            return {plain_text:"No hay descripción disponible."}
          })
}

//Retorna los datos de un producto individual
service.obtenerItem = function(producto){
	return axios.get('https://api.mercadolibre.com/items/'+producto)
}

//Llama a la API de categorías para obtener el array para el breadcrumb de producto individual
service.obtenerCategoria = function(categoria){
	return axios.get("https://api.mercadolibre.com/categories/"+categoria)
     
              .then(function (response) {
                var categorias = response.data.path_from_root;
                return categorias
              })
              
              .catch(function (error) { 
                var categorias = [{name:"Producto sin categorizar"}] //Para el caso eventual de que no pueda recuperar la info de categorías
                return categorias
              });
}

//Me devuelve el texto de la descripción o, si no la hay, un string de aviso.
service.traerDescripcion = function(datos){
  var data = datos.data
  if(data===undefined || data==="" || !data){
    return "No hay descripción disponible."
  }else if(!data.plain_text || data.plain_text===""){
    return "No hay descripción disponible"
  }else{
    return datos.data.plain_text
  }
}

service.calculoDecimales = function(numero){
    var decimalesTodos  = numero - Math.floor(numero)
    var decimales = decimalesTodos.toFixed(2).toString().replace("0.","")  
    return decimales
}

module.exports = service;

