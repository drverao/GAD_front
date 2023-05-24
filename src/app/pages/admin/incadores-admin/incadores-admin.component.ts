import { Component, ViewChild, ElementRef } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';
import { IndicadoresService } from 'src/app/services/indicadores.service';
@Component({
  selector: 'app-incadores-admin',
  templateUrl: './incadores-admin.component.html',
  styleUrls: ['./incadores-admin.component.css']
})
export class IncadoresAdminComponent {
  searchText = '';
  constructor(private indicadorservice: IndicadoresService,
  ) {
  }
  ngOnInit() {
    this.listar()
  }

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public indic = new Indicador();
  indicadors: any[] = [];
  
  listar(): void {
    this.indicadorservice.getIndicadors().subscribe(
      (data: Indicador[]) => {
        this.indicadors = data;
      },
      (error: any) => {
        console.error('Error al listar los indicadors:', error);
      }
    );
  }
}
