import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarPipe } from './buscar.pipe';
import { BuscarUsuarioPipe } from './buscar-usuario.pipe';



@NgModule({
  declarations: [BuscarPipe,BuscarUsuarioPipe],
  imports: [
    CommonModule
  ],
  exports: [BuscarPipe,BuscarUsuarioPipe],
})
export class SharedModule { }
