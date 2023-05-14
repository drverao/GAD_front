import { Component, OnInit } from '@angular/core';
import { Ponderacion } from 'src/app/models/Ponderacion';
import { PonderacionService } from 'src/app/services/ponderacion.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Modelo } from 'src/app/models/Modelo';
import { ModeloService } from 'src/app/services/modelo.service';
import { AsignacionIndicadorService } from 'src/app/services/asignacion-indicador.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { Indicador } from 'src/app/models/Indicador';

@Component({
  selector: 'app-ponderacion-indicador',
  templateUrl: './ponderacion-indicador.component.html',
  styleUrls: ['./ponderacion-indicador.component.css']
})
export class PonderacionIndicadorComponent implements OnInit{

  dataSource: any[] = [];
  ponderacionClase: Ponderacion=new Ponderacion();
  myForm: FormGroup;
  model: Modelo = new Modelo();
  asignacion: any;
  indicadorClase: Indicador=new Indicador();


  constructor(
    private servicePonderacion:PonderacionService,
    public fb:FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService,
    private modeloService:ModeloService,
    private asignacionIndicadorService: AsignacionIndicadorService,
    private indicadorservice: IndicadoresService
  ){
    this.myForm = fb.group({});
   }
  
  ngOnInit(): void {
  this.listarPonderacion();
  this.recibeModelo();
  this.recibeIndicador();
  }

  //Crear Ponderacion
  crearPonderacion(){
    
  
    this.servicePonderacion.guardarPonderacion(this.ponderacionClase)
      .subscribe(
        (data: any) => {
          console.log('Ponderacion creada con éxito:',data);
          Swal.fire(
            'Ponderacion Registrada!',
            'success'
          );
          this.listarPonderacion(); 
        },
        (error: any) => {
          console.error('Error al crear el subcriterio:', error);
        }
      );
      this.router.navigate(['/detalle-indicador']);
      

  }

  listarPonderacion(){
    this.servicePonderacion.listarPonderacion().subscribe(data => {
      this.dataSource = data;
    });
  }

  listarPorId(

  ){}

  modificarPonderacion(){
   this.servicePonderacion.actualizar(this.ponderacionClase.id_ponderacion,this.ponderacionClase)
          .subscribe(data =>{
            console.log('Ponderacion creada con éxito:',data);
          
    this.listarPonderacion(); 
  })
  }

  eliminarPonderacion(){}

 
  recibeModelo () {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
  })
 
  }

  recibeIndicador() {
    let id = localStorage.getItem("id");
    this.modeloService.getModeloById(Number(id)).subscribe(data => {
      this.model = data;
     
      this.indicadorservice.getIndicadorById(Number(id)).subscribe(data => {
        this.indicadorClase = data;
        console.log('Criterio  id :',this.indicadorClase);
      this.asignacionIndicadorService.getAsignacionIndicadorByIdModelo(Number(id)).subscribe(info => {
        this.indicadorservice.getIndicadors().subscribe(result => {
          this.dataSource = [];
          this.asignacion = info;
          this.dataSource = result.filter((indicador: any) => {
            return info.some((asignacion: any) => {
              return indicador.id_indicador === asignacion.indicador.id_indicador && indicador.subcriterio?.id_subcriterio === this.sharedDataService.obtenerIdSubCriterio();
               
            });
            
          });
         
       
        });
       
      });
      
  });
 
    });
  }

}
