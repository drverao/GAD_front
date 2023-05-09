import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoModeloComponent } from '../dialogo-modelo/dialogo-modelo.component';
import { Router } from '@angular/router';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/Modelo';



@Component({
  selector: 'app-inicio-modelo',
  templateUrl: './inicio-modelo.component.html',
  styleUrls: ['./inicio-modelo.component.css']
})
export class InicioModeloComponent implements OnInit {
  mode = new Modelo();

  datasource: any[] = [];
  constructor(public dialog: MatDialog, private router: Router, private modeloService: ModeloService) { }
  ngOnInit(): void {
    this.modeloService.listarModelo().subscribe(data => {
      this.datasource = data;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogoModeloComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => {
    });

  }
  irDetalle(object: any) {
    this.router.navigate(['/detallemodelo']);
  }

  enviarModelo(modelo: Modelo): void {
    localStorage.setItem("id", modelo.id_modelo.toString());
    console.log(modelo.id_modelo)
    this.mode = modelo;
    this.router.navigate(['/detallemodelo']);
  }

}