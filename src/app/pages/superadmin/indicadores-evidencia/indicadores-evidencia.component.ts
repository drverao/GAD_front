import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Evidencia } from 'src/app/models/Evidencia';
import { ActivatedRoute, Router } from '@angular/router';
import { EvidenciaService } from 'src/app/services/evidencia.service';
import { Indicador } from 'src/app/models/Indicador';
@Component({
  selector: 'app-indicadores-evidencia',
  templateUrl: './indicadores-evidencia.component.html',
  styleUrls: ['./indicadores-evidencia.component.css']
})
export class IndicadoresEvidenciaComponent{
  searchText = '';
  constructor(private evidenciaservice: EvidenciaService,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.frmEvidencia = fb.group({
      descripcion: ['', [Validators.required]],
    })
  }
  indicador: Indicador = new Indicador();
  ngOnInit() {
    const data = history.state.data;
    console.log(data); // aquí tendrías el objeto `evidencia` de la fila seleccionada.
    this.indicador = history.state.data;
    this.listar()
  }
  
  @ViewChild('datosModalRef') datosModalRef: any;
  miModal!: ElementRef;
  public evid = new Evidencia();
  evidencias: any[] = [];
  frmEvidencia: FormGroup;
  guardadoExitoso: boolean = false;

  guardar() {
    this.evid = this.frmEvidencia.value;
    this.evid.indicador = this.indicador;
    this.evidenciaservice.crear(this.evid)
      .subscribe(
        (response: any) => {
          console.log('Subcriterio creado con éxito:', response);
          this.guardadoExitoso = true;
          this.listar();
        },
        (error: any) => {
          console.error('Error al crear el evidencia:', error);
        }
      );

  }
  eliminar(evidencia: any) {
    this.evidenciaservice.eliminarEvidencia( evidencia).subscribe(
      (response: any) => {
        this.listar()
      }
    );
  }

  listar(): void {
    this.evidenciaservice.getEvidencias().subscribe(
      (data: Evidencia[]) => {
        this.evidencias = data.filter(evidencia => evidencia.indicador?.id_indicador === this.indicador.id_indicador);
      },
      (error: any) => {
        console.error('Error al listar los evidencias:', error);
      }
    );
  }

  editDatos(evidencia: Evidencia) {
    this.evid = evidencia;
    this.frmEvidencia = new FormGroup({
      descripcion: new FormControl(evidencia.descripcion)
    });
  }

  limpiarFormulario() {
    this.frmEvidencia.reset();
    this.evid = new Evidencia;
  }

  actualizar() {
    this.evid.descripcion = this.frmEvidencia.value.descripcion;

    this.evidenciaservice.actualizar(this.evid.id_evidencia, this.evid)
      .subscribe((response: any) => {
        this.evid = new Evidencia();
        this.listar();
      });
  }
}
