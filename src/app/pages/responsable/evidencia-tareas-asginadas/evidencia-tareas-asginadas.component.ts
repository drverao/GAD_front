import { Component, ViewChild } from '@angular/core';
import { Asigna_Evi } from 'src/app/models/Asignacion-Evidencia';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleEvaluacionService } from 'src/app/services/detalle-evaluacion.service';
import { AsignaEvidenciaService } from 'src/app/services/asigna-evidencia.service';
import { LoginService } from 'src/app/services/login.service';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/models/Evidencia';
@Component({
  selector: 'app-evidencia-tareas-asginadas',
  templateUrl: './evidencia-tareas-asginadas.component.html',
  styleUrls: ['./evidencia-tareas-asginadas.component.css']
})
export class EvidenciaTareasAsginadasComponent {
  columnas: string[] = [
    'id_evidencia',
    'nombre',
    'descripcion',
    'actions',
  ];
  dataSource = new MatTableDataSource<Asigna_Evi>();
  listaEvidencias : Evidencia[]=[];
  isLoggedIn = false;
  user: any = null;
  evidencias!: Evidencia[];

  listaAsigEvi: Asigna_Evi[]=[];
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }
  constructor(
    private asignaService: AsignaEvidenciaService,
    public login:LoginService,
    private evidenciaService: EvidenciaService,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      
      }
    )


    console.log(this.user.username)
      this.evidenciaService.geteviasig(this.user.username).subscribe(data => {
        this.evidencias = data;
      });
    }

    verDetalles(evidencia: any) {
      this.router.navigate(['/ActividadesResponsable'], { state: { data: evidencia} });
    }


  }















