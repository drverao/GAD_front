import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoCriterioComponent } from '../dialogo-criterio/dialogo-criterio.component';
import { DialogoSubcriterioComponent } from '../dialogo-subcriterio/dialogo-subcriterio.component';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNodeToggle } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';
import { Modelo } from 'src/app/models/Modelo';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Subject } from 'rxjs';


let VALOR: any[];

@Component({
  selector: 'app-dialogo-modelo',
  templateUrl: './dialogo-modelo.component.html',
  styleUrls: ['./dialogo-modelo.component.css']
})
export class DialogoModeloComponent implements OnInit {


  modelo: Modelo = new Modelo();

  constructor(private dialogRef: MatDialogRef<DialogoModeloComponent>, private _formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private modelo_service: ModeloService, private sharedDataService: SharedDataService) {
    VALOR = this.sharedDataService.listaIndicadores;
  }

  ngOnInit(): void {
  }



  //metodo para crear un modelo
  public createModelo(): void {
    console.log(this.modelo);
    if (this.modelo.fecha_inicio == null || this.modelo.fecha_fin == null || this.modelo.fecha_final_act == null) {
      Swal.fire('Error', `Debe llenar todos los campos`, 'error');
      return;
    }
    this.modelo_service.createModelo(this.modelo).subscribe(
      response => {
        this.router.navigate(['/modelo']);
        console.log(response);
        Swal.fire('Modelo creado', `Modelo creado con éxito`, 'success');
      }
    )
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  displayedColumns: string[] = ['nombre'];
  dataSource: any;

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(DialogoCriterioComponent, {
      width: '50%',
      data: { /* datos que se pasan al diálogo */ }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = VALOR;
    });
  }
  addSubcriterio(): void {
    const dialogRef = this.dialog.open(DialogoSubcriterioComponent, {
      width: '50%',
      data: { /* datos que se pasan al diálogo */ }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }



}
