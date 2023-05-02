import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperGuard } from './services/super.guard';
import { CriteriosAdminComponent } from './pages/admin/criterios-admin/criterios-admin.component';
import { SubcriteriosAdminComponent } from './pages/admin/subcriterios-admin/subcriterios-admin.component';
import { IncadoresAdminComponent } from './pages/admin/incadores-admin/incadores-admin.component';
import { EvalucionComponent } from './pages/admin/evalucion/evalucion.component';
import { CrearUsuariosComponent } from './pages/superadmin/crear-usuarios/crear-usuarios.component';
import { CriteriosComponent } from './pages/superadmin/criterios/criterios.component';
import { SubcriteriosComponent } from './pages/superadmin/subcriterios/subcriterios.component';
import { IndicadorComponent } from './pages/superadmin/indicador/indicador.component';
import { EvidenciasComponent } from './pages/superadmin/evidencias/evidencias.component';
import { ModeloComponent } from './pages/superadmin/modelo/modelo.component';
import { ActividadesComponent } from './pages/responsable/actividades/actividades.component';
import { EvidenciasResponComponent } from './pages/responsable/evidencias/evidencias.component';
import { ConsultaActividadComponent } from './pages/autoridad/consulta-actividad/consulta-actividad.component';
import { AutoridadGuardService } from './services/autoridad.guard';
import { ReportesComponent } from './pages/autoridad/reportes/reportes.component';
import { AsignaComponent } from './pages/admin/asigna/asigna.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },

  {
    path : 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },

  //PATHS DE ADMINISTRADOR
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  },
  {
    path:'criterios',
    component:CriteriosAdminComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  }
  ,
  {
    path:'subcriterios',
    component:SubcriteriosAdminComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'indicadores',
    component:IncadoresAdminComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'evaluacion',
    component:EvalucionComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'asigna',
    component:AsignaComponent,
    pathMatch:'full',
    //canActivate:[AdminGuard]
  }

  //PATHS DE SUPERADMIN

  ,
  {
    path:'usuarios',
    component:CrearUsuariosComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path:'criterioSuper',
    component:CriteriosComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path:'subcriterioSuper',
    component:SubcriteriosComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path:'indicadoreSuper',
    component:IndicadorComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path:'evidenciaSuper',
    component:EvidenciasComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path:'modelo',
    component:ModeloComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  }

   //PATHS DE RESPONSABLE

   ,
  {
    path:'actividad',
    component:ActividadesComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  },
  {
    path:'evidenciaResponsable',
    component:EvidenciasResponComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  }

  //PATHS DE AUTORIDAD

  ,
  {
    path:'consulta',
    component:ConsultaActividadComponent,
    pathMatch:'full',
    canActivate:[AutoridadGuardService]
  },
  {
    path:'reporte',
    component:ReportesComponent,
    pathMatch:'full',
    canActivate:[AutoridadGuardService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
