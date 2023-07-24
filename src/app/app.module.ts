import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CriteriosService } from './services/criterios.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CriteriosAdminComponent } from './pages/admin/criterios-admin/criterios-admin.component';
import { SubcriteriosAdminComponent } from './pages/admin/subcriterios-admin/subcriterios-admin.component';
import { IncadoresAdminComponent } from './pages/admin/incadores-admin/incadores-admin.component';
import { EvalucionComponent } from './pages/admin/evalucion/evalucion.component';
import { ReportesComponent } from './pages/autoridad/reportes/reportes.component';
import { ConsultaActividadComponent } from './pages/autoridad/consulta-actividad/consulta-actividad.component';
import { SiderbarComponent } from './components/siderbar/siderbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsignaComponent } from './pages/admin/asigna/asigna.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { MatSelectModule } from '@angular/material/select';
import { EvidenciasResponComponent } from './pages/responsable/evidencias/evidencias.component';

import { AprobarRechazarAdminComponent } from './pages/admin/aprobar-rechazar-admin/aprobar-rechazar-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsignacionEvidenciaComponent } from './pages/admin/asignacion-evidencia/asignacion-evidencia.component';


/* importaciones ce diego */
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ActividadAutoridadComponent } from './pages/autoridad/actividad_autoridad/actividad-autoridad.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FenixComponent } from './pages/fenix/fenix.component';
import { ActividadesResponsableComponent } from './pages/responsable/actividades-responsable/actividades-responsable.component';
import { EvidenciaTareasAsginadasComponent } from './pages/responsable/evidencia-tareas-asginadas/evidencia-tareas-asginadas.component';
import { MatListModule } from '@angular/material/list';
import { AprobarRechazarDetalleAdminComponent } from './pages/admin/aprobar-rechazar-detalle-admin/aprobar-rechazar-detalle-admin.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgChartsModule } from 'ng2-charts';
import { GraficosComponent } from './pages/autoridad/graficos/graficos.component';
import { PonderacionComponent } from './pages/superadmin/ponderacion/ponderacion/ponderacion.component';
import { PonderacionIndicadorComponent } from './pages/superadmin/ponderacion/ponderacion-indicador/ponderacion-indicador.component';
import { PonderacionCriterioComponent } from './pages/superadmin/ponderacion/ponderacion-criterio/ponderacion-criterio.component';
import { PonderacionModeloComponent } from './pages/superadmin/ponderacion/ponderacion-modelo/ponderacion-modelo.component';
import { PonderacionfinalComponent } from './pages/superadmin/ponderacion/ponderacionfinal/ponderacionfinal.component';
import { ActividadCriterioModelo } from './pages/responsable/actividad-criterio-modelo/actividad-criterio-modelo.component';
import { ActividadCriterioDetalle } from './pages/responsable/actividad-criterio-detalle/actividad-criterio-detalle.component';
import { ActividadCriterioSubcriterio } from './pages/responsable/atividad-criterio-subcriterio/atividad-criterio-subcriterio.component';
import { ActiviadDetalleIndicadorComponent } from './pages/responsable/actividad-detalle-indicador/actividad-detalle-indicador.component';

import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    EvidenciasResponComponent,
    DashboardComponent,
    UserDashboardComponent,
    CriteriosAdminComponent,
    SubcriteriosAdminComponent,
    IncadoresAdminComponent,
    EvalucionComponent,
    ReportesComponent,
    ConsultaActividadComponent,
    SiderbarComponent,
    FooterComponent,
    AsignaComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    ActividadesResponsableComponent,
    AsignacionEvidenciaComponent,
    AprobarRechazarAdminComponent,
    ActividadAutoridadComponent,
    
    FenixComponent,
    ActividadesResponsableComponent,
    GraficosComponent,
    
    ActividadesResponsableComponent,
    
    EvidenciaTareasAsginadasComponent,
    AprobarRechazarDetalleAdminComponent,
    PonderacionComponent,
    PonderacionIndicadorComponent,
    PonderacionCriterioComponent,
    PonderacionModeloComponent,
    PonderacionfinalComponent,
    ActividadCriterioModelo,
    ActividadCriterioDetalle,
    ActividadCriterioSubcriterio,
    ActiviadDetalleIndicadorComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatListModule,
    NgChartsModule,
    SharedModule
  ],

  providers: [authInterceptorProviders, CriteriosService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) { }
}
