import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Indicador } from 'src/app/models/Indicador';
import { Subcriterio } from 'src/app/models/Subcriterio';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { SubcriteriosService } from 'src/app/services/subcriterios.service';
@Component({
  selector: 'app-subcriterios-admin',
  templateUrl: './subcriterios-admin.component.html',
  styleUrls: ['./subcriterios-admin.component.css']
})
export class SubcriteriosAdminComponent {
  searchText = '';
  constructor(
    private indicadorservice: IndicadoresService,
    private subcriterioservice: SubcriteriosService,
  ) {
  }
  ngOnInit() {
    this.listar()
  }

  buscar = '';
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public subcrite = new Subcriterio();
  subcriterios: any[] = [];

  
  listar(): void {
    this.subcriterioservice.getSubcriterios().subscribe(
      (data: Subcriterio[]) => {
        this.subcriterios = data;
      },
      (error: any) => {
        console.error('Error al listar los subcriterios:', error);
      }
    );
    this.listarSub();
  }

  //Numero de indicadores
  lista_indicadores: any[] = [];
  getIndicadoresPorSubriterio(subcriterio: Subcriterio): number {
    let contador = 0;
    for (let indicador of this.lista_indicadores) {
      if (indicador.subcriterio.id_subcriterio === subcriterio.id_subcriterio) {
        contador++;
      }
    }
    return contador;
  }
  listarSub(): void {
    this.indicadorservice.getIndicadors().subscribe(
      (data: Indicador[]) => {
        this.lista_indicadores = data;
      },
      (error: any) => {
        console.error('Error al listar los indicadores:', error);
      }
    );
  }
}
