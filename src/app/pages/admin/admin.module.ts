import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CriteriosAdminComponent } from './criterios-admin/criterios-admin.component';
import { SubcriteriosAdminComponent } from './subcriterios-admin/subcriterios-admin.component';
import { IncadoresAdminComponent } from './incadores-admin/incadores-admin.component';
import { EvalucionComponent } from './evalucion/evalucion.component';
import { AsignaComponent } from './asigna/asigna.component';
import { AsignacionEvidenciaComponent } from './asignacion-evidencia/asignacion-evidencia.component';
import { AprobarRechazarAdminComponent } from './aprobar-rechazar-admin/aprobar-rechazar-admin.component';
import { AprobarRechazarDetalleAdminComponent } from './aprobar-rechazar-detalle-admin/aprobar-rechazar-detalle-admin.component';

import { SharedModule } from 'src/app/shared/shared.module';
// Importa los módulos de PrimeNG necesarios
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog'; // Importar el módulo del diálog
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { FormPlanOperativoComponent } from './form-plan-operativo/form-plan-operativo.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    DashboardComponent,
    CriteriosAdminComponent,
    SubcriteriosAdminComponent,
    IncadoresAdminComponent,
    EvalucionComponent,
    AsignaComponent,
    AsignacionEvidenciaComponent,
    AprobarRechazarAdminComponent,
    AprobarRechazarDetalleAdminComponent,
    FormPlanOperativoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    CardModule,
    TooltipModule,
    ListboxModule,
    AccordionModule,
    DividerModule
  ],
})
export class AdminModule {}
