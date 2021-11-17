import React from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'

export default class Articulo extends React.Component {
  constructor(props){
    super(props);
    
    this.onComprar = this.onComprar.bind(this);
    this.onCantidad = this.onCantidad.bind(this);
    
    this.refAr = React.createRef(null);
    this.state = {
      value : 1,
      comprado : null,
      cantidad: this.props.parametros.articulo.cantidad
    }
  
  }

  onComprar = (e) => {
    if(this.refAr.current.value > 0){
      e.preventDefault();
      this.props.onCompra(this.props.parametros.articulo, this.refAr.current.value);
      this.setState({value : (this.state.cantidad - this.refAr.current.value > 0) ? 1 : 0, comprado : <h4>*agregado a carrito*</h4>, cantidad : this.state.cantidad - this.refAr.current.value});
    } 
  }

  onCantidad = function(e) {
    e.preventDefault();
    this.setState({value : +e.target.value});
  }


  render(){
    const {articulo, indice} = this.props.parametros;

    if(this.state.cantidad > 0) return(
      <div className="col-12 col-sm-4 col-lg-3 item text-center" key={articulo.id_articulo}>
          <img className="m-1" src={`data:image/jpeg;base64,${articulo.foto}`} style={{width : 100}} alt="No imagen"/><br/>
          <NavDropdown.Divider/>
          <h3>{articulo.descripcion}</h3><br/>
          <div>{"Precio $" + articulo.precio}</div>
          <NavDropdown.Divider/>

          <input type="number" 
          value={this.state.value}
          min={0} max={this.state.cantidad}
          ref={this.refAr} onInput={this.onCantidad} 
          data-index={indice} data-art={articulo.id_articulo}></input><br/>

          <div className="btn btn-dark m-1" onClick={this.onComprar} data-art={articulo.id_articulo} data-index={indice}>
            Comprar
          </div><br/>
          {this.state.comprado}
      </div>
    );

    return(<></>);
     

  }

}

