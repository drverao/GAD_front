import { Component } from '@angular/core';
import { Fenix } from 'src/app/models/Fenix';
import { FenixService } from 'src/app/services/fenix.service';



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
    this.fenix_service.getDocenteByCedula(this.fenix.cedula).subscribe(
      (result) => {
        this.dataSource = result;
        console.log(result);
      }
    )
  }
}
