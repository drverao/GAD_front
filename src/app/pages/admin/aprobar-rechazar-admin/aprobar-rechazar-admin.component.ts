import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Evidencia } from 'src/app/services/Evidencia';
import { EvidenciaService } from 'src/app/services/evidencia.service';

@Component({
  selector: 'app-aprobar-rechazar-admin',
  templateUrl: './aprobar-rechazar-admin.component.html',
  styleUrls: ['./aprobar-rechazar-admin.component.css']
})
export class AprobarRechazarAdminComponent implements OnInit {

  columnas: string[] = ['id_evidencia', 'enlace', 'nombre', 'visible', 'indicador_id_indicardores','actions'];
  dataSource2 = new MatTableDataSource<Evidencia>();

  @ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator || null;
  }


  constructor(
    private evidenciaService:EvidenciaService,
    ) {
    }


    ngOnInit(): void {

      this.evidenciaService.getEvidencias().subscribe(
        listaEvi => {
          this.dataSource2.data = listaEvi;
        }
      );
    }


}


