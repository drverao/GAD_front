import { Component, ViewChild, ElementRef } from '@angular/core';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
@Component({
  selector: 'app-criterio-reporte',
  templateUrl: './criterio-reporte.component.html',
  styleUrls: ['./criterio-reporte.component.css']
})
export class CriterioReporteComponent {
  searchText = '';
  constructor(
    private indicadorservice: IndicadoresService,
    private criterioservice: CriteriosService,
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
  criterios: any[] = [];
  listar(): void {
    this.indicadorservice.getIndicadors().subscribe(
      (data: Indicador[]) => {
        this.indicadors = data;
        this.listarcriterio();
      },
      (error: any) => {
        console.error('Error al listar los indicadors:', error);
      }
    );
  }
  listarcriterio(): void {
    this.criterioservice.getCriterios().subscribe(
      (data: Criterio[]) => {
        // Agregar opción inicial "Seleccione todos"
        this.criterios =data;
      },
      (error: any) => {
        console.error('Error al listar los criterios:', error);
      }
    );
  }
  public criteriosSeleccionados: Criterio[] = [];

  toggleCriterioSelection(criterio: Criterio) {
    if (this.isCriterioSelected(criterio)) {
      this.criteriosSeleccionados = this.criteriosSeleccionados.filter((c) => c.id_criterio !== criterio.id_criterio);
    } else {
      this.criteriosSeleccionados.push(criterio);
    }
  }

  isCriterioSelected(criterio: Criterio) {
    return this.criteriosSeleccionados.some((c) => c.id_criterio === criterio.id_criterio);
  }
  public buscarPorCriterio(): void {
    if (this.criteriosSeleccionados.length === 0) {
      this.listar();
    } else {
      const idsCriterios = this.criteriosSeleccionados.map((criterio) => criterio.id_criterio);
      this.indicadorservice.indicadoresPorCriterios(idsCriterios).subscribe(
        (data: Indicador[]) => {
          this.indicadors = data;
        },
        (error: any) => {
          console.error('Error al buscar los indicadores por criterio:', error);
        }
      );
    }
  }
  
}
