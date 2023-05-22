import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoModeloComponent } from '../dialogo-modelo/dialogo-modelo.component';
import { Router } from '@angular/router';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/Modelo';
import Swal from 'sweetalert2';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';



@Component({
  selector: 'app-inicio-modelo',
  templateUrl: './inicio-modelo.component.html',
  styleUrls: ['./inicio-modelo.component.css']
})
export class InicioModeloComponent implements OnInit {
  mode = new Modelo();
   asignacion:any;
  datasource: any[] = [];
  constructor(public dialog: MatDialog,
     private router: Router, 
     private modeloService: ModeloService,
     private asignacionIndicadorService:AsignacionIndicadorService,
     private indicadorservice:IndicadoresService
     ) { }
  ngOnInit(): void {
    this.listar();
  
    this.calculatePromedioPorModelo1();
   
   
  }

  listar() {
    this.modeloService.listarModelo().subscribe(data => {
      this.datasource = data;
    });
   
    
   
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogoModeloComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listar();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modelo creado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    });

  }
  irDetalle(object: any) {
    this.router.navigate(['/detallemodelo']);
  }

  enviarModelo(modelo: Modelo): void {
    localStorage.setItem("id", modelo.id_modelo.toString());
    this.mode = modelo;
    this.router.navigate(['/detallemodelo']);
  }

  calculatePromedioPorModelo() {
    const promediosPorCriterio: { [criterio: string]: number } = {};
    const conteoIndicadoresPorCriterio: { [criterio: string]: number } = {};
  
    this.datasource.forEach((indicador: any) => {
      const criterioNombre = indicador.asignacionindicador.modelo.nombre;
      if (criterioNombre) {
        if (promediosPorCriterio[criterioNombre]) {
          promediosPorCriterio[criterioNombre] += indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] += 1;
        } else {
          promediosPorCriterio[criterioNombre] = indicador.porc_obtenido;
          conteoIndicadoresPorCriterio[criterioNombre] = 1;
        }
      }
    });
  
    Object.keys(promediosPorCriterio).forEach((criterio: string) => {
      const indicadoresCount = conteoIndicadoresPorCriterio[criterio];
      const promedioCriterio = promediosPorCriterio[criterio] / indicadoresCount;
      promediosPorCriterio[criterio] = promedioCriterio;
    });
    console.log(promediosPorCriterio);
  
    console.log(conteoIndicadoresPorCriterio);
    this.recibeIndicador();
  }
  

  recibeIndicador() {
    let idModelo = localStorage.getItem("id");
   
       // Capturar el ID del indicador del modelo
      
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(idModelo)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.datasource = [];
          this.asignacion = info;
          

          this.datasource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador;
            });
          });
          console.log(this.datasource+'capturar');

          

          
  
         
        });
      });
    
  }

  calculatePromedioPorModelo1() {
    const promediosPorModelo: { [modelo: string]: number } = {};
    const conteoIndicadoresPorModelo: { [modelo: string]: number } = {};
  
    this.datasource.forEach((modelo: any) => {
      const modeloNombre = modelo.nombre;
      modelo.forEach((asignacion: any) => {
        const indicador = asignacion.indicador;
        if (modeloNombre && indicador) {
          if (promediosPorModelo[modeloNombre]) {
            promediosPorModelo[modeloNombre] += indicador.porc_obtenido;
            conteoIndicadoresPorModelo[modeloNombre] += 1;
          } else {
            promediosPorModelo[modeloNombre] = indicador.porc_obtenido;
            conteoIndicadoresPorModelo[modeloNombre] = 1;
          }
        }
      });
    });
  
    Object.keys(promediosPorModelo).forEach((modelo: string) => {
      const indicadoresCount = conteoIndicadoresPorModelo[modelo];
      const promedioModelo = promediosPorModelo[modelo] / indicadoresCount;
      promediosPorModelo[modelo] = promedioModelo;
    });
  
    console.log(promediosPorModelo);
    console.log(conteoIndicadoresPorModelo);
  }
  

  

  }