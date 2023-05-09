import { Component, OnInit } from '@angular/core';
import { Asigna_Evi } from 'src/app/models/Asignacion-Evidencia';
import { Evidencia } from 'src/app/models/Evidencia';
import { usuario } from 'src/app/services/Usuario';
import { AsignaEvidenciaService } from 'src/app/services/asigna-evidencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-evidencia',
  templateUrl: './asignacion-evidencia.component.html',
  styleUrls: ['./asignacion-evidencia.component.css']
})
export class AsignacionEvidenciaComponent implements OnInit {

  evidencias: Evidencia[] = [];
  usuarioResponsable: usuario[] = [];
  asigna_evide: Asigna_Evi[] = [];
  asigna = new Asigna_Evi;
  asignaN = new Asigna_Evi;

  constructor(private asignaService: AsignaEvidenciaService) { 
    if (this.asigna_evide == null || this.asigna_evide==undefined) {
      
    }
  }

  ngOnInit(): void {
    this.listaResponsable();
    this.listaEvidencia();
    this.listaAsignacionesEvi();
  }

  listaResponsable() {
    this.asignaService.listarUsuario().
      subscribe(data => {
        this.usuarioResponsable = data;
        console.log(this.usuarioResponsable);
      })
  }


  listaEvidencia() {
    this.asignaService.listarEvidencia().
    subscribe(data => {
      this.evidencias=data;
      console.log(this.evidencias);
    })
  }

  listaAsignacionesEvi(){
    this.asignaService.listarAsignarEvi().
    subscribe(data => {
      this.asigna_evide=data;
    })
  }

  guardar(asigna: Asigna_Evi) {
    console.log(asigna.evidencia);
    if (asigna.usuario != null || asigna.usuario != undefined ||
      asigna.evidencia != null || asigna.evidencia != undefined) {
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
          this.listaAsignacionesEvi();
          console.log("hhh" + asigna);
        })
    }else{
      Swal.fire('Llene todos los campos', '', 'warning')
    }

  }

  editar(asigna: Asigna_Evi): void {
    localStorage.setItem("id_asigE", asigna.id_asignacion_evidencia.toString());
    console.log(asigna.id_asignacion_evidencia)
    this.asignaN = asigna;
    //this.Editar();
    //this.router.navigate(['admin/editProduc']);
  }

  Editar() {

    let id = localStorage.getItem("id_asigE");
    console.log(id);
    this.asignaService.getAsignacionId(Number(id))
      .subscribe(data => {
        this.asignaN = data;
        console.log(this.asignaN)
      })

  }

  Actualizar(asignaNu: Asigna_Evi) {
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
        this.asignaService.updateAsigna(this.asignaN)
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
            this.listaAsignacionesEvi();
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


  eliminar(asigna: Asigna_Evi) {
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
            this.asigna_evide = this.asigna_evide.filter(p => p !== asigna);
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
