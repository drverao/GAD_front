import { Component, ViewChild, ElementRef } from '@angular/core';
import { Criterio } from 'src/app/models/Criterio';
import { Indicador } from 'src/app/models/Indicador';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
    this.indicadorservice.indicadoresPorCriterios([]).subscribe(
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
    this.criterioservice.getCriteriosUltimoModelo().subscribe(
      (data: Criterio[]) => {
        // Agregar opción inicial "Seleccione todos"
        this.criterios = data;
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
  generarInforme(): void {
    const content = [];

    // Agrega el título
    content.push({ text: 'Informe de Indicadores', style: 'titulo' });
    content.push({ text: '\n' });

    // Crea la tabla de datos
    const tableData = [];
    tableData.push([
      'CRITERIO',
      'SUBCRITERIO',
      'INDICADOR',
      'DESCRIPCIÓN',
      'VALOR OBTENIDO',
      'PORCENTAJE OBTENIDO',
      'PORCENTAJE UTILIDAD',
    ]);

    // Agrega los datos de la tabla
    this.indicadors.forEach(indicador => {
      tableData.push([
        indicador.subcriterio.criterio.nombre,
        indicador.subcriterio.nombre,
        indicador.nombre,
        indicador.descripcion,
        indicador.valor_obtenido,
        indicador.porc_obtenido,
        indicador.porc_utilida_obtenida,
      ]);
    });

    // Agrega la tabla al contenido del informe
    content.push({
      table: {
        headerRows: 1,
        body: tableData,
      },
      style: 'tabla',
    });
    // Agrega el título
    content.push({ text: 'Informe de Indicadores', style: 'titulo' });
    content.push({ text: '\n' });
    // Define los estilos del informe
    const styles = {
      titulo: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
      },
      tabla: { margin: [0, 10, 0, 10] },
    };

    // Crea el documento PDF
    const documentDefinition:any = { content, styles,pageOrientation: 'landscape', };
    // Genera el PDF y descárgalo
    pdfMake.createPdf(documentDefinition).download('informe.pdf');
  }

}
