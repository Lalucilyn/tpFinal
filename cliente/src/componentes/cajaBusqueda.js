import React, { Component } from 'react';
import '../css/cajaBusquedaStyle.css';

class Busqueda extends Component {

  constructor(){
    super();
    this.state = {
    }
  }
  
  render() {
    return (
    <div> 
      <form type="get" id="cajaBusqueda" action="/items">
        <a id="miLogo" href="/"><img src="/images/logo.png" alt="logo"/>
          <span>Uni-Commerce</span>
        </a> 
        <div className="buscador">
          <input name="search" type="text" placeholder=" Ingresá tu criterio de búsqueda" required/>
          <button id="miBoton" type="submit"></button>
        </div>
     </form>  
    </div>
    )
  }
}

export default Busqueda;