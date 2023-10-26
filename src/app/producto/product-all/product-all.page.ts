import { Component, OnInit } from '@angular/core';
import { ClProducto } from '../model/ClProducto';
@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  producto: ClProducto = {
    id: 1, nombreprod: '', categoria: '', precio: 0,
    codigo: '',
    cantidad: '',
    fechaNacimiento: '',
    rut: null,
    dv: '',
    enfermedad: '',
    fonocontacto: 0,
    editorial: '',
    raza: '',
    edad: 0,
    altura: 0,
    hrini: '',
    hrfin: '',
    direccion: '',
    fCreacion: ''
  };;


  constructor() { }
  ngOnInit() {  }
  public id: string = '';




  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}



