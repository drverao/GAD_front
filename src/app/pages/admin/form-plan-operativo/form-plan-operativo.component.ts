import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, AbstractControl  , ValidationErrors } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-plan-operativo',
  templateUrl: './form-plan-operativo.component.html',
  styleUrls: ['./form-plan-operativo.component.css'],
  providers: [MessageService],
})

export class FormPlanOperativoComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  //Tabla Paso 4
  data: any[] = [];
  column3Total: number = 0;
  subcolumn1Total: number = 0;
  subcolumn2Total: number = 0;
  subcolumn3Total: number = 0;
  subcolumn4Total: number = 0;
  //Tabla Paso 5

  data2: any[] = [];
  column3Total2: number = 0;


  FormPaso1: FormGroup;
  FormPaso3: FormGroup;
  isLoggedIn = false;
  user: any = null;
  constructor(public messageService: MessageService,private router: Router,private formBuilder: FormBuilder,
    public login: LoginService) {
    this.items = [];
        //Validaciones
        this.FormPaso1 = this.formBuilder.group({
          direccion: ['', Validators.required],
          area: ['', Validators.required],
          supervision: ['', Validators.required],
        });
      
        this.FormPaso3 = this.formBuilder.group({
          tipoProyecto: ['', Validators.required],
          tipoEjecucion: ['', Validators.required],
          cobertura: ['', Validators.required],
          localizacion: ['', Validators.required],
          barrio: ['', Validators.required],
          comunidad: ['', Validators.required],
          sectorInversion: ['', Validators.required],

        });
      
      }


  ngOnInit(): void {
    this.items = [
      { label: 'Paso 1', command: (event: any) => this.changeStep(0) },
      {label: 'Paso 2', command: (event: any) => this.changeStep(1), },
      { label: 'Paso 3', command: (event: any) => this.changeStep(2) },
      { label: 'Paso 4', command: (event: any) => this.changeStep(3) },
      { label: 'Paso 5', command: (event: any) => this.changeStep(4) },
    ];
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
    console.log("aquiii")
    console.log(this.user)

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
  
//Tabla 1
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
//Tabla 2
  addRow2(): void {
    this.data2.push({
      column1: '',
      column2: '',
      column3: "",
    });
  }

  removeRow2(rowIndex: number): void {
    this.data2.splice(rowIndex, 1);
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
         this.router.navigate(['/admin']);
       }
}
