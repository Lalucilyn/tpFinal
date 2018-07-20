import React, { Component } from 'react';
import '../css/resultadosStyle.css';
var auxiliares = require("../auxiliares/auxiliares.js")
class Resultados extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textoError:"",
    loading:true
    }
  }
  
  //Llamo a mi servidor que a su vez llamará al endpoint search de MELI
  componentDidMount() {
    var that = this; 
    fetch("/items")
    .then((response) => {
      return response.json()
    })
    .then((recurso) => {
      if(recurso.error){
        this.setState({error:true})
        this.setState({textoError:recurso.error})
        this.setState({loading:false})
      }else{ 
        this.setState({ data: recurso })
        this.setState({loading:false})
      }
    })
    .catch(function(error){
      that.setState({error:true});
      that.setState({loading:false})
      that.setState({textoError:"No se pudo establecer la conexión con el servidor"})
     })
  }
  
  render() {
    var arrayDatos = this.state.data.items
    var arrayCategorias = this.state.data.categories
    console.log(arrayCategorias)

    return (
      <div>
        {this.state.error && <div className="mensaje"><img src="/images/errorLogo.png" alt="logo"/><h1>{this.state.textoError}</h1></div>}
        {this.state.loading && <div className="spinner"></div>}
        <div id="cajaContenido">
          <ul>
            {arrayCategorias && arrayCategorias.map(function(name,index){
              return <li key={name}>{name}{auxiliares.agregarSimbolo(arrayCategorias,index)}</li>})}
          </ul>
          <div>
            {arrayDatos && arrayDatos.map(function(name, index){
              var itemUrl = "/items/"+name.id
              return <a key={itemUrl} href={itemUrl}>
                        <article className="producto">
                          <figure>
                            <img src={name.picture} alt="Thumbnail del producto"/>
                          </figure>
                          <div className="flexItems">
                            <div className="nombrePrecio">
                              <h2 className="precio">
                                <span>{auxiliares.elegirMoneda(name.price.currency)}{auxiliares.imprimirPrecio(name.price.amount)}</span>
                                {name.price.decimals!=="00" && <span className="decimales">{name.price.decimals}</span>}
                                {name.free_shipping && <i className="fas fa-truck"></i>}
                              </h2>
                              <h3>{name.title}</h3>
                            </div>
                            <h4>{name.location}</h4>
                          </div>
                        </article>
                      </a>})
            }
          </div>
        </div> 
     </div>
    )
  }
}

export default Resultados;

