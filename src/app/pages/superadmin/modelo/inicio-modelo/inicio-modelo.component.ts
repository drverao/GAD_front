import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoModeloComponent } from '../dialogo-modelo/dialogo-modelo.component';
import { DetalleModeloComponent } from '../detalle-modelo/detalle-modelo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-modelo',
  templateUrl: './inicio-modelo.component.html',
  styleUrls: ['./inicio-modelo.component.css']
})
export class InicioModeloComponent {
  constructor(public dialog: MatDialog,private router:Router) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogoModeloComponent, { width: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  irDetalle(){
    this.router.navigate(['/detallemodelo']);
  }

}