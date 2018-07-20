import React, { Component } from 'react';
import '../css/productoStyle.css';
var auxiliares = require('../auxiliares/auxiliares.js')

class Producto extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textError:"",
    loading:true
    }
  }

  //Llamo a mi servidor que a la vez llamará a los endpoints item y description de MELI
  componentDidMount() {
    var that = this
    fetch("/items/item")
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
        that.setState({textoError:"No se pudo establecer la conexión con el servidor"})
        that.setState({loading:false})
      })
  }



  render() {
      var item = this.state.data.item
      var categorias = this.state.data.categories

      return (
      <div id="vistaProducto">
         {this.state.loading && <div className="spinner"></div>}
         {this.state.error && <div className="mensaje"><img src="/images/errorLogo.png" alt="logo"/><h1>{this.state.textoError}</h1></div>}
        <ul>
          {categorias && categorias.map(function(name,index){
            return <li key={name.id}>{name.name}{auxiliares.agregarSimbolo(categorias,index)}</li>
            })
          }
        </ul>
        <div>
          {item && <div className="miProducto">
          <article>
            <figure>
              <img src={item.picture} alt="Imagen del producto"/>
            </figure><div className="info">
            <h5>{auxiliares.traducirCondicion(item.condition)} - {item.sold_quantity} vendidos </h5>
            <h3>{item.title}</h3>
            <h5 className="price">
              <span>
                {auxiliares.elegirMoneda(item.price.currency)}{auxiliares.imprimirPrecio(item.price.amount)}
              </span>
              {item.price.decimals!=="00" && <span className="decimales">{item.price.decimals}</span>}
            </h5>
            {item.free_shipping && <h6>Envío gratis</h6>}
            <button>Comprar</button></div>
          </article>
          <div className="descripcion">
            <h2>Descripción del producto</h2>
            <p>{item.description}</p>
          </div>
        </div>}
        </div>
      </div>
    )
  }
}

export default Producto;