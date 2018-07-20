var axios = require('axios')
const JSON = require('circular-json');
var url = require('url');
const querystring = require('querystring')
const service = require('../services/serviceBusqueda')
const self = {};

//Devuelve los resultados de búsqueda
self.apiBusqueda = function(req,res,next){
  //Obtengo el query
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var query = (querystring.parse(urlParseada.query)).search;

  //Si me llega un query inválido, envío una respuesta
  if(query===undefined||!query) {
    var respuesta = {
                    error:"Búsqueda inválida. Por favor, intentalo nuevamente"
                    }
    res.send(JSON.stringify(respuesta))
  }
  //Si me llega un query válido, lo proceso para enviar los resultados
  else{
    //Llamo a la API de search
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=/'+query+'&limit=4')
    .then(function (response) {
      //Creo el objeto con el formato solicitado
      return {
             author:{
             name:"Lucía", 
             lastname:"Wainfeld"
             }, 
             categories:service.categorizar(query,response),
             items:service.obtenerItems(response)
             }
      })

    .then(function(datos){
      var misDatos = datos;
      res.send(JSON.stringify(misDatos))
    })

    .catch(function (error) {
      var miError = {error:"No se han encontrado resultados. Ingresá una nueva búsqueda"}
      res.send(JSON.stringify(miError))
    })
  };
}

//Devuelve cada producto individualmente
self.apiProducto = async function(req,res,next){
  //Recupero el ID de producto
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var pathname = urlParseada.pathname;
  var id = pathname.replace("/items/", "");
  
  //Llamo a las apis de item y descripción
  axios.all([service.obtenerDescripcion(id), service.obtenerItem(id)])
  .then(axios.spread(async function (descripcion, producto) {
    miProducto = {
      author:{
        name:"Lucía",
        lastname:"Wainfeld"
      },
      item:{
        id:producto.data.id,
        title:producto.data.title,
        price:{
          currency:producto.data.currency_id,
          amount:Math.floor(producto.data.price),
          decimals:service.calculoDecimales(producto.data.price)
        },
        picture:producto.data.pictures[0].url,
        condition:producto.data.condition,
        free_shipping:producto.data.shipping.free_shipping,
        sold_quantity:producto.data.sold_quantity,
        description:service.traerDescripcion(descripcion)
      }
    }
    const arrayCategories = await service.obtenerCategoria(producto.data.category_id)
    miProducto.categories = arrayCategories
    return miProducto
  }))

  .then(function(datos){
    var misDatos = datos;
    var miJSON = JSON.stringify(misDatos)
    res.send(miJSON)
  })

  .catch(function (error) {
    var miError = {error:"No se pudo recuperar la información del producto solicitado. Por favor ingresá otra búsqueda"}
    res.send(JSON.stringify(miError))
    })
};

 

module.exports = self;

