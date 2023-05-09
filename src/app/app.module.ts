import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CriteriosService } from './services/criterios.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CrearUsuariosComponent } from './pages/superadmin/crear-usuarios/crear-usuarios.component';
import { CriteriosComponent } from './pages/superadmin/criterios/criterios.component';
import { EvidenciasComponent } from './pages/superadmin/evidencias/evidencias.component';
import { IndicadorComponent } from './pages/superadmin/indicador/indicador.component';
import { ModeloComponent } from './pages/superadmin/modelo/modelo.component';
import { SubcriteriosComponent } from './pages/superadmin/subcriterios/subcriterios.component';
import { CriteriosAdminComponent } from './pages/admin/criterios-admin/criterios-admin.component';
import { SubcriteriosAdminComponent } from './pages/admin/subcriterios-admin/subcriterios-admin.component';
import { IncadoresAdminComponent } from './pages/admin/incadores-admin/incadores-admin.component';
import { EvalucionComponent } from './pages/admin/evalucion/evalucion.component';
import { ActividadesComponent } from './pages/responsable/actividades/actividades.component';
import { ReportesComponent } from './pages/autoridad/reportes/reportes.component';
import { ConsultaActividadComponent } from './pages/autoridad/consulta-actividad/consulta-actividad.component';
import { SiderbarComponent } from './components/siderbar/siderbar.component';
//import {fas, faPlus, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import { FooterComponent } from './components/footer/footer.component';
import { AsignaComponent } from './pages/admin/asigna/asigna.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
//import { BuscarPipe } from './pages/admin/criterios-admin/buscar.pipe';
import { FormulasComponent } from './pages/superadmin/formulas/formulas.component';
//import { BuscarPipe } from './services/buscar.pipe';
import { SubcriteriosIndicadorComponent } from './pages/superadmin/subcriterios-indicador/subcriterios-indicador.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { BuscarUsuarioPipe } from './pages/superadmin/crear-usuarios/buscar-usuario.pipe';
import { MatSelectModule } from '@angular/material/select';
import { BuscarPipe } from './services/buscar.pipe';
import { CriteriosSubcriterioComponent } from './pages/superadmin/criterios-subcriterio/criterios-subcriterio.component';
import { CuantitativaComponent } from './pages/superadmin/cuantitativa/cuantitativa.component';
import { CuanlitativaComponent } from './pages/superadmin/cuanlitativa/cuanlitativa.component';
import { AsignacionEvidenciaComponent } from './pages/admin/asignacion-evidencia/asignacion-evidencia.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    CrearUsuariosComponent,
    CriteriosComponent,
    SubcriteriosComponent,
    IndicadorComponent,
    ModeloComponent,
    EvidenciasComponent,
    CriteriosAdminComponent,
    SubcriteriosAdminComponent,
    IncadoresAdminComponent,
    EvalucionComponent,
    ActividadesComponent,
    ReportesComponent,
    ConsultaActividadComponent,
    SiderbarComponent,
    FooterComponent,
    AsignaComponent,
    PageNotFoundComponent,
    BuscarPipe,
    FormulasComponent,
    CriteriosSubcriterioComponent,
    SubcriteriosIndicadorComponent,
    UserProfileComponent,
    BuscarUsuarioPipe,
    CuantitativaComponent,
    CuanlitativaComponent,
    AsignacionEvidenciaComponent 

  ],
  imports: [
    BrowserModule,
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
    MatSelectModule
  ],
  providers: [authInterceptorProviders,CriteriosService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){}
 }
