import { Component } from '@angular/core';
import { Fenix } from 'src/app/models/Fenix';
import { FenixService } from 'src/app/services/fenix.service';
import Swal from 'sweetalert2';



let ELEMENT_DATA: Fenix[] = [];

@Component({
  selector: 'app-fenix',
  templateUrl: './fenix.component.html',
  styleUrls: ['./fenix.component.css']
})
export class FenixComponent {

  fenix: Fenix = new Fenix();
  constructor(private fenix_service: FenixService) { }

  displayedColumns: string[] = [
    'cedula',
    'primer_apellido',
    'segundo_apellido',
    'primer_nombre',
    'segundo_nombre',
    'celular'];
  dataSource = ELEMENT_DATA;

  public consultar() {
    this.fenix_service.getFenixData().subscribe(
      (result) => {
        this.dataSource = result;
        console.log(result);
        console.log(this.fenix.cedula);
      }
    )
  }

  //consumir servicio de fenix para obtener datos de la persona por cedula
  public consultarPorCedula() {
    if (this.fenix.cedula == null || this.fenix.cedula == '') {
      Swal.fire('Error', 'Debe ingresar una cedula', 'error');
      return;
    }
    this.fenix_service.getDocenteByCedula(this.fenix.cedula).subscribe(
      (result) => {
        this.dataSource = result;
      }
    )
  }

  //consumir servicio de fenix para obtener datos de la persona por cedula y apellidos
  public consultarPorCedulaYApellidos() {
    if ((this.fenix.cedula == null || this.fenix.cedula == '')
      && (this.fenix.primer_apellido == null || this.fenix.primer_apellido == '')
      && (this.fenix.segundo_apellido == null || this.fenix.segundo_apellido == '')) {
      Swal.fire('Error', 'Debe ingresar al menos un parametro para buscar', 'error');
      return;
    }
    this.fenix_service.getDocenteByCedulaAndApellidos(this.fenix.cedula, this.fenix.primer_apellido, this.fenix.segundo_apellido).subscribe(
      (result) => {
        this.dataSource = result;
      }
    )
  }
}
