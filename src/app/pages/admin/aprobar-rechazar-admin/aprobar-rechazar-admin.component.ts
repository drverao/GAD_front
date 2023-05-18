import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/models/Evidencia';
import { Usuario2 } from 'src/app/services/Usuario2';
import { EvidenciaService } from 'src/app/services/evidencia.service';

@Component({
  selector: 'app-aprobar-rechazar-admin',
  templateUrl: './aprobar-rechazar-admin.component.html',
  styleUrls: ['./aprobar-rechazar-admin.component.css'],
})
export class AprobarRechazarAdminComponent implements OnInit {
  columnas: string[] = ['id', 'descripcion', 'actions'];

  dataSource = new MatTableDataSource<Evidencia>();
  isLoggedIn = false;
  user: any = null;
  mostrarBoton = false;
  idUsuario: number = 0;
  usuarioResponsable: Usuario2[] = [];
  usuarioSeleccionado: Usuario2 = new Usuario2();
  evidencias!: Evidencia[];

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }

  constructor(
    private evidenciaService: EvidenciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
 
    this.listaResponsable();
  }
  
  onSelectionChange(event: MatSelectionListChange) {
    // const selectedOption = event.source.selectedOptions.selected[0];
    // const usuario = selectedOption.value as Usuario2; // conversión de tipo explícita
    //  console.log(usuario);
    // this.usuarioSeleccionado = usuario;

    // const username = this.usuarioSeleccionado?.username;

    this.usuarioSeleccionado = event.options[0].value;
    console.log(this.usuarioSeleccionado);

    this.evidenciaService
      .geteviasig(this.usuarioSeleccionado.username)
      .subscribe((data) => {
        this.evidencias = data;
        this.dataSource.data = this.evidencias;
      });

    console.log(this.evidencias);
    this.mostrarBoton = true;
  }




  listaResponsable() {
    this.evidenciaService.listarUsuario().subscribe((data) => {

 
      // Filtrar elementos repetidos por el atributo "id"
      
      const usuariosFiltrados = data.filter(
        (usuario, index, self) =>
          index === self.findIndex((u) => u.id === usuario.id)
      );
      this.usuarioResponsable = usuariosFiltrados;
      this.dataSource.data = usuariosFiltrados;

      //console.log('datosssssssssssss');
      //   console.log(this.usuarioResponsable);
    });
  }


  verDetalles(evidencia: any) {
    console.log(evidencia);
    this.router.navigate(['/detalleAprobarRechazar'], {
      state: { data: evidencia, usuarioEnviar: this.usuarioSeleccionado },
    });
  }
}
