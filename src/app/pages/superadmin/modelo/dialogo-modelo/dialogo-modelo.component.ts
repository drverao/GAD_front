import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogoCriterioComponent } from '../dialogo-criterio/dialogo-criterio.component';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';
import { Modelo } from 'src/app/models/Modelo';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { Indicador } from 'src/app/models/Indicador';
import { LoginService } from 'src/app/services/login.service';
import { AsignacionIndicador } from 'src/app/models/AsignacionIndicador';
import { DialogoSubcriterioComponent } from '../dialogo-subcriterio/dialogo-subcriterio.component';
import { Asignacion_Criterios } from 'src/app/models/Asignacion-Criterios';
import { AsignacionCriterioService } from 'src/app/services/asignacion-criterio.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';

let VALOR: any[] = [];


@Component({
  selector: 'app-dialogo-modelo',
  templateUrl: './dialogo-modelo.component.html',
  styleUrls: ['./dialogo-modelo.component.css']
})
export class DialogoModeloComponent implements OnInit {

  isLoggedIn = false;
  user: any;


  modelo: Modelo = new Modelo();
  indicador: Indicador = new Indicador();
  asignacionIndicador: AsignacionIndicador = new AsignacionIndicador();
  listaIndicadores: Indicador[] = [];

  constructor(public login: LoginService, private asignacionIndicadorService: AsignacionIndicadorService, private dialogRef: MatDialogRef<DialogoModeloComponent>, private _formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private modelo_service: ModeloService, private sharedDataService: SharedDataService,
    private asignacionAdminService: AsignacionCriterioService,
    private indicadorService: IndicadoresService) {

  }

  ngOnInit(): void {

    this.sharedDataService.datos$.subscribe(data => {
      this.dataSource = VALOR;
      this.dataSource = data;
      console.log(this.dataSource);
    });

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

      }
    );
    console.log(this.user);
  }



  //metodo para crear un modelo
  public createModelo(): void {
    if (this.modelo.fecha_inicio == null || this.modelo.fecha_fin == null || this.modelo.fecha_final_act == null || this.modelo.nombre == null || this.dataSource.length == 0) {
      Swal.fire('Error', `Debe llenar todos los campos`, 'error');
      return;
    }

    //control de fechas de las 3
    if (this.modelo.fecha_inicio >= this.modelo.fecha_fin || this.modelo.fecha_inicio >= this.modelo.fecha_final_act || this.modelo.fecha_fin <= this.modelo.fecha_final_act) {
      Swal.fire('Error', `Las fechas no son correctas porfavor revisar`, 'error');
      return;
    }

    this.modelo_service.createModelo(this.modelo).subscribe(
      response => {
        console.log(response);
        this.dataSource.forEach((element: any) => {
          this.asignacionIndicador.indicador = element;
          this.asignacionIndicador.modelo = response;
          this.asignacionIndicadorService.createAsignacionIndicador(this.asignacionIndicador).subscribe(
            (result) => {
              console.log(result);
              this.reiniciarAdmin();
              this.reiniciarIndicador();
              this.bloquearModelo(response.id_modelo);
              this.sharedDataService.agregarDatos([]);
              this.dialogRef.close();
            }
          )
        });

      }
    )
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  displayedColumns: string[] = ['nombre'];
  dataSource: any;

  abrirDialogo(): void {

    const dialogRef = this.dialog.open(DialogoCriterioComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.dataSource = VALOR;
      // console.log('El diálogo se cerró');
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


  reiniciarAdmin() {
    this.asignacionAdminService.listarAsignarResponsable().subscribe(data => {
      data.forEach((element: any) => {
        this.asignacionAdminService.deleteAsignacion_Admin(element.id_asignacion).subscribe(data => {
          console.log(data);
        });
      });
    })
  }

  reiniciarIndicador() {
    this.indicadorService.getIndicadores().subscribe(data => {
      data.forEach((element: any) => {
        element.valor_obtenido = 0;
        element.porc_obtenido = 0;
        element.porc_utilida_obtenida = 0;
        this.indicadorService.ponderarIndicador(element.id_indicador, element).subscribe(data => {
          console.log(data);
        });
      });
    })
  }

  bloquearModelo(id: any) {
    this.modelo_service.listarModeloExcepto(id).subscribe(data => {
      data.forEach((element: any) => {
        this.modelo_service.eliminarlogic(element.id_modelo).subscribe(data => {
          console.log(data);
        });
      });
    });
  }
}
