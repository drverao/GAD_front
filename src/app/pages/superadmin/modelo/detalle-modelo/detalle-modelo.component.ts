import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Router } from '@angular/router';
import { Modelo } from 'src/app/models/Modelo';
@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {


  modeloClase: Modelo[] = [];
  constructor(private modeloService: ModeloService, private router: Router){}

  datosMenu=[{
    'titulo':'GOOGLE',
    'icon':'fas fa-clock',
    'url':'https://www.google.com/'
   },
   {
     'titulo':'bootstrap',
     'icon':'fas fa-clock',
     'url':'https://www.w3schools.com/bootstrap4/bootstrap_navbar.asp'
    }];

  ngOnInit(): void {
    this.listaModelo();
  
  }

  listaModelo() {
    this.modeloService.listarModelo()
      .subscribe(data => {
        this.modeloClase = data;
      })
  }

  id:any='';
  accordion(ids:any){
    if(this.id==ids){
      this.id='';
    }
    else {
      this.id=ids;
    }

  }
  

}
