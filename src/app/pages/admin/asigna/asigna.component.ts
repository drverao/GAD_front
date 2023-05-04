import { Component, OnInit } from '@angular/core';
import { asigna_R } from 'src/app/models/Asigna-Responsable';
import { Criterio } from 'src/app/models/Criterio';
import { Modelo } from 'src/app/models/Modelo';
import { usuario } from 'src/app/services/Usuario';
import { AsignacionResponsableService } from 'src/app/services/asignacion-responsable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asigna',
  templateUrl: './asigna.component.html',
  styleUrls: ['./asigna.component.css']
})
export class AsignaComponent implements OnInit {

  usuarioResponsable: usuario[] = [];
  criterios: Criterio[] = [];
  modelos: Modelo[] = [];
  asignaciones: asigna_R[] = [];
  asigna = new asigna_R;
  asignaN = new asigna_R;

  constructor(private asignaService: AsignacionResponsableService) {
    if (this.asignaciones == null) {

    }
  }

  ngOnInit(): void {
    this.listaResponsable();
    this.listaCriterios();
    this.listaModelos();
    this.listaAsignaciones();
  }

  listaResponsable() {
    this.asignaService.listarUsuario().
      subscribe(data => {
        this.usuarioResponsable = data;
        console.log(this.usuarioResponsable);
      })
  }

  listaCriterios() {
    this.asignaService.listarCriterios().
      subscribe(data => {
        this.criterios = data;
        console.log(this.criterios);
      })
  }

  listaModelos() {
    this.asignaService.listarModelos().
      subscribe(data => {
        this.modelos = data;
        console.log(this.modelos);
      })
  }

  listaAsignaciones() {
    this.asignaService.listarAsignarResponsable().
      subscribe(data => {
        this.asignaciones = data;
        console.log(this.asignaciones);
      })
  }

  guardar(asigna: asigna_R) {
    console.log(asigna.criterio);
    if (asigna.usuario != null || asigna.usuario != undefined ||
      asigna.criterio != null || asigna.criterio != undefined ||
      asigna.modelo != null || asigna.modelo != undefined) {
      this.asignaService.createAsigna(asigna).
        subscribe(data => {
          asigna = data;
          Swal.fire({
            title: 'Asignado éxitosamente',
            icon: 'success',
            iconColor: '#17550c',
            color: "#0c3255",
            confirmButtonColor: "#0c3255",
            background: "#63B68B",
          })
          this.listaAsignaciones();
          console.log("hhh" + asigna);
        })
    }else{
      Swal.fire('Llene todos los campos', '', 'warning')
    }

  }

  editar(asigna: asigna_R): void {
    localStorage.setItem("id_asig", asigna.id_asignacion.toString());
    console.log(asigna.id_asignacion)
    this.asignaN = asigna;
    this.Editar();
    //this.router.navigate(['admin/editProduc']);
  }

  Editar() {

    let id = localStorage.getItem("id_asig");
    console.log(id);
    this.asignaService.getAsignacionId(Number(id))
      .subscribe(data => {
        this.asignaN = data;
        console.log(this.asignaN)
      })

  }

  Actualizar(asignaNu: asigna_R) {
    console.log(asignaNu)
    Swal.fire({
      title: '¿Desea modificar los campos?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //COLOCAR EL CODIGO A EJECUTAR
        this.asignaService.updateAsigna(asignaNu)
          .subscribe(data => {
            this.asignaN = data;
            Swal.fire({
              title: 'Producto Modificada éxitosamente',
              icon: 'success',
              iconColor: '#17550c',
              color: "#0c3255",
              confirmButtonColor: "#0c3255",
              background: "#63B68B",
            })
            this.listaAsignaciones();
            //alert("Se Actualiazo");
            //this.router.navigate(['admin/crudProduc'])
          });
        //FIN DEL CODIGO A EJECUTAR
        //Swal.fire('Modificado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ningun campo modificado', '', 'info')
      }
    })


  }


  eliminar(asigna: asigna_R) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: "No será capaz de revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        //COLOCAR EL CODIGO A EJECUTAR
        this.asignaService.deleteAsigna(asigna)
          .subscribe(data => {
            this.asignaciones = this.asignaciones.filter(p => p !== asigna);
            Swal.fire(
              'Borrado!',
              'Su archivo ha sido borrado.',
              'success'
            )
          });
        //FIN DEL CODIGO A EJECUTAR

      }
    })
  }

}
