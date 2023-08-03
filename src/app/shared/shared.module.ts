import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarPipe } from './buscar.pipe';
import { BuscarUsuarioPipe } from './buscar-usuario.pipe';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//PRIMENG 
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [BuscarPipe,BuscarUsuarioPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule, 
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTreeModule,
    MatStepperModule,
    MatMomentDateModule,
    MomentDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    NgChartsModule,
    ButtonModule,
    ToastModule,
    StepsModule,
    CardModule,
    CalendarModule,
    InputTextModule ,
    AccordionModule,
    DialogModule,
    TableModule,
    CheckboxModule
  ],
  exports: [
    BuscarPipe,
    BuscarUsuarioPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTreeModule,
    MatStepperModule,
    MatMomentDateModule,
    MomentDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    NgChartsModule,
    ButtonModule,
    ToastModule,
    StepsModule,
    CardModule,
    CalendarModule,
    InputTextModule ,
    AccordionModule,
    DialogModule,
    TableModule,
    CheckboxModule
  ],
})
export class SharedModule { }
