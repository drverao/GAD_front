import { Component, OnInit } from '@angular/core';
import { Modelo } from 'src/app/models/Modelo';
import { ModeloService } from 'src/app/services/modelo.service';
import { PonderacionService } from 'src/app/services/ponderacion.service';
import { Ponderacion } from 'src/app/models/Ponderacion';

@Component({
  selector: 'app-ponderacionfinal',
  templateUrl: './ponderacionfinal.component.html',
  styleUrls: ['./ponderacionfinal.component.css']
})
export class PonderacionfinalComponent implements  OnInit  {

  dataSource:any;
  modelo=new Modelo();
  ponderacion:any ;
  ponde=new Ponderacion();


   constructor( 
    private servicePonderacion:PonderacionService,
    private modeloService:ModeloService

    )
    {}
  ngOnInit(): void {
    this.listarPonderacion();
    console.log(this.listarPonderacion()+'ponde');
  }

  listarPonderacion() {
  

      this.servicePonderacion.listarPonderacion().subscribe(
        (data: Ponderacion[]) => {
          this.ponderacion = data;
        },
        (error: any) => {
          console.error('Error al listar ponderacion:', error);
        }
      );
     
 
   
   
  }
 

}
function ViewChild(arg0: string): (target: PonderacionfinalComponent, propertyKey: "datosModalRef") => void {
  throw new Error('Function not implemented.');
}

