import React from 'react'
import { Link } from 'react-router-dom';


class Options  extends React.Component{

  constructor(props){
    super(props);
    this.onCaptura = this.onCaptura.bind(this);
    this.onCompra = this.onCompra.bind(this);
    
    this.state = {
      hidden : true
    }

  }

  onCaptura() {
    this.setState({hidden : true});
  }

  onCompra() {
    this.setState({hidden : false});
  }

  render(){

    return (
      <div className="row header sticky-top">
	<div className="col-sm col-12 text-center m-1">
	  <Link to="captura">
	    <button className="btn btn-dark" onClick={this.onCaptura}>Capturar Articulos</button>
	  </Link>
	</div>
	<div className="col-sm col-12 text-center m-1">
	  <Link to="compra">
	    <button className="btn btn-dark"onClick={this.onCompra}>Comprar Articulos</button>
	  </Link>
	</div>
	
	{this.state.hidden ? null : 
	<div className="col-sm col-12 text-center m-1">
	  <Link to="carrito">
	    <button className="btn btn-dark">Carrito de Compra</button>
	  </Link>
	</div>}

      </div>
    );
  }
}


export default Options;
