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
  data: any[] = [];
  column3Total: number = 0;
  subcolumn1Total: number = 0;
  subcolumn2Total: number = 0;
  subcolumn3Total: number = 0;
  subcolumn4Total: number = 0;
  datatabla2: any[] = [];

  constructor(public messageService: MessageService,private router: Router,) {
    this.items = [];}
  ngOnInit(): void {
    this.items = [
      { label: 'Paso 1', command: (event: any) => this.changeStep(0) },
      {label: 'Paso 2', command: (event: any) => this.changeStep(1), },
      { label: 'Paso 3', command: (event: any) => this.changeStep(2) },
      { label: 'Paso 4', command: (event: any) => this.changeStep(3) },
      { label: 'Paso 5', command: (event: any) => this.changeStep(4) },
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
  

removeRow(rowIndex: number): void {
  this.data.splice(rowIndex, 1);
  this.calculateTotalRemo(); 
}

  calculateTotal(rowData: any): void {
    rowData.column4 = rowData.subcolumn1 + rowData.subcolumn2 + rowData.subcolumn3 + rowData.subcolumn4;
    // Actualizar sumas individuales
    this.column3Total = this.data.reduce((sum, row) => sum + row.column3, 0);
    this.subcolumn1Total = this.data.reduce((sum, row) => sum + row.subcolumn1, 0);
    this.subcolumn2Total = this.data.reduce((sum, row) => sum + row.subcolumn2, 0);
    this.subcolumn3Total = this.data.reduce((sum, row) => sum + row.subcolumn3, 0);
    this.subcolumn4Total = this.data.reduce((sum, row) => sum + row.subcolumn4, 0);
  }


calculateTotalRemo(): void {
  this.column3Total = this.data.reduce((sum, row) => sum + row.column3, 0);
  this.subcolumn1Total = this.data.reduce((sum, row) => sum + row.subcolumn1, 0);
  this.subcolumn2Total = this.data.reduce((sum, row) => sum + row.subcolumn2, 0);
  this.subcolumn3Total = this.data.reduce((sum, row) => sum + row.subcolumn3, 0);
  this.subcolumn4Total = this.data.reduce((sum, row) => sum + row.subcolumn4, 0);
}


  addRow(): void {
    this.data.push({
      column1: '',
      column2: '',
      column3: 0,
      subcolumn1: 0,
      subcolumn2: 0,
      subcolumn3: 0,
      subcolumn4: 0,
    });
  }

  calculateSumTotal(): number {
    return this.data.reduce((sum, rowData) => sum + rowData.column4, 0);
  }
  onActiveIndexChange(event: number) {
    this.activeIndex = event; }

    save() {}
    
  
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
        //  this.router.navigate(['/inicioModelo']);
       }
}
