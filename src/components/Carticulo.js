import React from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'

export default class Ccompra extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cantidad : props.parametros.compra.cantidad
    }

  }

  render(){
    const {compra, indice} = this.props.parametros;

    if(this.state.cantidad > 0) return(
      <div className="col-12 col-sm-4 col-lg-3 item text-center" key={compra.id_compra}>
          <img className="m-1" src={`data:image/jpeg;base64,${compra.foto}`} style={{width : 100}} alt="No imagen"/><br/>
          <NavDropdown.Divider/>
          <h3>{compra.descripcion}</h3><br/>
          <div>{"Cantidad: " + compra.cantidad}</div><br/>
          <div>{"Precio: $" + compra.precio}</div>
          <NavDropdown.Divider/>
          <h3>{"Costo: $" + compra.costo}</h3>
      </div>
    );

    return(<></>);

  }

}
