import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Criterio } from 'src/app/models/Criterio';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CriteriosService } from 'src/app/services/criterios.service';
@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit{
  buscar='';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public crite=new Criterio();
  criterios: any[] = [];
  frmCriterio: FormGroup;
  guardadoExitoso: boolean = false;
  constructor(private criterioservice:CriteriosService,
    private router:Router, private fb:FormBuilder
  ){
    this.frmCriterio=fb.group({
      nombre:['', Validators.required],
      descripcion:['', [Validators.required, Validators.maxLength(250)]]
    })
  }
  ngOnInit(): void {
    
  }
  
  guardar(){
    //alert('Guardado')
    console.log(this.frmCriterio.value);
    this.guardadoExitoso = true;
  }
  eliminar(criterio:Criterio){
    //alert('Guardado')
    console.log(this.frmCriterio.value);

  }

  listar(): void {
    this.criterioservice.getCriterios().subscribe(
        (data: any[]) => {
            this.criterios = data;
            console.log(data);
        },
        (error: any) => {
            console.error('Error al listar los criterios:', error);
        }
    );
}

editDatos(criterio: Criterio) {
  this.crite.id_criterio = criterio.id_criterio
  this.crite.nombre = criterio.nombre
  this.crite.descripcion = criterio.descripcion
  this.datosModalRef.nativeElement.querySelector('[name="nombre"]').value = criterio.nombre;
  this.datosModalRef.nativeElement.querySelector('[name="descripcion"]').value = criterio.descripcion;
}

crear(): void {
  this.criterioservice.crear(this.crite)
      .subscribe(
          (response) => {
              console.log('Criterio creado con éxito:', response);
          },
          (error) => {
              console.error('Error al crear el criterio:', error);
          }
      );
}

actualizar() {
  this.criterioservice.actualizar(this.crite.id_criterio, this.crite)
      .subscribe(response => {
          this.crite = new Criterio();
          this.listar();
      });
}
}
