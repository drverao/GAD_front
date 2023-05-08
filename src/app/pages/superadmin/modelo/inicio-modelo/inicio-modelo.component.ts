import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoModeloComponent } from '../dialogo-modelo/dialogo-modelo.component';
import { DetalleModeloComponent } from '../detalle-modelo/detalle-modelo.component';
import { Router } from '@angular/router';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-inicio-modelo',
  templateUrl: './inicio-modelo.component.html',
  styleUrls: ['./inicio-modelo.component.css']
})
export class InicioModeloComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private modeloService: ModeloService) { }
  ngOnInit(): void {
    this.modeloService.listarModelo().subscribe(data => {
      console.log(data);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogoModeloComponent, { width: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  irDetalle() {
    this.router.navigate(['/detallemodelo']);
  }

}