import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-plan-operativo',
  templateUrl: './form-plan-operativo.component.html',
  styleUrls: ['./form-plan-operativo.component.css'],
  providers: [MessageService],
})
export class FormPlanOperativoComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor(
    public messageService: MessageService,
    private router: Router,
  ) {
    this.items = [];
  }
  ngOnInit(): void {
    this.items = [
      { label: 'Paso 1', command: (event: any) => this.changeStep(0) },
      {
        label: 'Paso 2',
        command: (event: any) => this.changeStep(1),
      },
      { label: 'Paso 3', command: (event: any) => this.changeStep(2) },
      { label: 'Paso 4', command: (event: any) => this.changeStep(3) },
      { label: 'Confirmar', command: (event: any) => this.changeStep(4) },
    ];
  }
  changeStep(index: number) {
    switch (index) {
      case 0:

        break;
      case 1:

        break;
      case 2:

        break;
        case 3:

        break;
        case 4:

        break;
    }

    this.activeIndex = index;
  }
  
 
  onActiveIndexChange(event: number) {
    this.activeIndex = event; }

    save() {
  
    }
    
  
    goBack() {
      if (this.activeIndex > 0) {
        this.changeStep(this.activeIndex - 1);  } }
  
    goNext() {
     /* if (this.activeIndex < this.items.length - 1) {
        if (this.activeIndex === 0 && !this.FormModelo.valid) {
          // Verificar si es valido el formulario
          return;}
        if (this.activeIndex === 0) {
          // Obtener los datos del formulario
        this.changeStep(this.activeIndex + 1);}*/}


        Cancelar() {
          this.router.navigate(['/inicioModelo']); }
}
