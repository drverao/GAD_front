import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {
  personaForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) { }

  irAOtraPagina() {
    // Cambia la URL de la página a la que deseas redireccionar
    this.router.navigate(['/usuarios']);
  }
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id_persona: ['', Validators.required],
      cedula: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_apellido: [''],
      segundo_nombre: ['']
    });
  }

  onSubmit() {
    if (this.personaForm.valid) {
      // Aquí puedes enviar los datos del formulario para crear la persona
      console.log(this.personaForm.value);
    } else {
      // Mostrar mensajes de error o realizar acciones cuando el formulario no es válido
    }
  }
}