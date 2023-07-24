
import { AdminGuard } from './services/Guards/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriosAdminComponent } from './pages/admin/criterios-admin/criterios-admin.component';
import { SubcriteriosAdminComponent } from './pages/admin/subcriterios-admin/subcriterios-admin.component';
import { IncadoresAdminComponent } from './pages/admin/incadores-admin/incadores-admin.component';
import { EvalucionComponent } from './pages/admin/evalucion/evalucion.component';
import { EvidenciasResponComponent } from './pages/responsable/evidencias/evidencias.component';
import { ActividadCriterioModelo } from './pages/responsable/actividad-criterio-modelo/actividad-criterio-modelo.component';

import { ConsultaActividadComponent } from './pages/autoridad/consulta-actividad/consulta-actividad.component';
import { ReportesComponent } from './pages/autoridad/reportes/reportes.component';
import { AsignaComponent } from './pages/admin/asigna/asigna.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NormalGuard } from './services/Guards/normal.guard';
import { SuperGuard } from './services/Guards/super.guard';
import { AutoridadGuardService } from './services/Guards/autoridad.guard';
import { RoleguardGuard } from './services/Guards/roleguard.guard';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';

import { AprobarRechazarAdminComponent } from './pages/admin/aprobar-rechazar-admin/aprobar-rechazar-admin.component';
import { ActividadAutoridadComponent } from './pages/autoridad/actividad_autoridad/actividad-autoridad.component';
import { AsignacionEvidenciaComponent } from './pages/admin/asignacion-evidencia/asignacion-evidencia.component';


import { FenixComponent } from './pages/fenix/fenix.component';




import { EvidenciaTareasAsginadasComponent } from './pages/responsable/evidencia-tareas-asginadas/evidencia-tareas-asginadas.component';
import { ActividadesResponsableComponent } from './pages/responsable/actividades-responsable/actividades-responsable.component';
import { AprobarRechazarDetalleAdminComponent } from './pages/admin/aprobar-rechazar-detalle-admin/aprobar-rechazar-detalle-admin.component';
import { GraficosComponent } from './pages/autoridad/graficos/graficos.component';


import { PonderacionModeloComponent } from './pages/superadmin/ponderacion/ponderacion-modelo/ponderacion-modelo.component';
import { PonderacionCriterioComponent } from './pages/superadmin/ponderacion/ponderacion-criterio/ponderacion-criterio.component';
import { PonderacionIndicadorComponent } from './pages/superadmin/ponderacion/ponderacion-indicador/ponderacion-indicador.component';
import { PonderacionComponent } from './pages/superadmin/ponderacion/ponderacion/ponderacion.component';
import { PonderacionfinalComponent } from './pages/superadmin/ponderacion/ponderacionfinal/ponderacionfinal.component';

import { ActividadCriterioDetalle } from './pages/responsable/actividad-criterio-detalle/actividad-criterio-detalle.component';
import { ActividadCriterioSubcriterio } from './pages/responsable/atividad-criterio-subcriterio/atividad-criterio-subcriterio.component';
import { ActiviadDetalleIndicadorComponent } from './pages/responsable/actividad-detalle-indicador/actividad-detalle-indicador.component';




const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },

  //PATHS DE ADMINISTRADOR
  {
    path: 'admin',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['RESPONSABLE', 'SUPERADMIN', 'ADMIN', 'AUTORIDAD'] }
  },
  {
    path: 'criterios',
    component: CriteriosAdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  }
  ,

  {
    path: 'subcriterios',
    component: SubcriteriosAdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'indicadores',
    component: IncadoresAdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'evaluacion',
    component: EvalucionComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'asigna',
    component: AsignaComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },

  {
    path: 'apruebaAdmin',
    component: AprobarRechazarAdminComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['SUPERADMIN', 'ADMIN'] }

  },
  {
    path: 'asignaEvidencia',
    component: AsignacionEvidenciaComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]

  },
  {
    path: 'detalleAprobarRechazar',
    component: AprobarRechazarDetalleAdminComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['SUPERADMIN', 'ADMIN'] }

  },

  //PATHS DE SUPERADMIN

  {
    //dashboard
    path: '',
    loadChildren: () => import("./pages/superadmin/superadmin.module").then(m => m.SuperadminModule)
  },


  
  {
    path: 'buscar',
    component: FenixComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
 
  {
    path: 'ponderacion',
    component: PonderacionComponent,
    pathMatch: 'full',
    //canActivate: [SuperGuard]
  },
  {
    path: 'ponderacion-final',
    component: PonderacionfinalComponent,
    pathMatch: 'full',
    //canActivate: [SuperGuard]
  },
  {
    path: 'ponderacion-indicador',
    component: PonderacionIndicadorComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'ponderacion-criterio',
    component: PonderacionCriterioComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  
  {
    path: 'ponderacion-modelo',
    component: PonderacionModeloComponent,
    pathMatch: 'full',
    //canActivate: [SuperGuard]
  },
  
  //PATHS DE RESPONSABLE

  {
    path: 'ActividadesResponsable',
    component: ActividadesResponsableComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  }
  ,
  {
    path: 'evidenciaResponsable',
    component: EvidenciasResponComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },

  {
    path: 'eviTareaAsina',
    component: EvidenciaTareasAsginadasComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'actividadCriterio',
    component: ActividadCriterioModelo,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },

  {
    path: 'detalleC',
    component: ActividadCriterioDetalle,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'criterio-subcriterio',
    component: ActividadCriterioSubcriterio,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'criterio-subcriterio',
    component: ActividadCriterioSubcriterio,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  }, {
    path: 'subcriterio-indicador',
    component: ActiviadDetalleIndicadorComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  }



  //PATHS DE AUTORIDAD

  ,
  {
    path: 'consulta',
    component: ConsultaActividadComponent,
    pathMatch: 'full',
    canActivate: [AutoridadGuardService]
  },
  {
    path: 'reporte',
    component: ReportesComponent,
    pathMatch: 'full',
    canActivate: [AutoridadGuardService]
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['RESPONSABLE', 'SUPERADMIN', 'ADMIN', 'AUTORIDAD'] }
  },
  
  {
    path: 'actividad_auto',
    component: ActividadAutoridadComponent,
    pathMatch: 'full',
    canActivate: [AutoridadGuardService]
  },
  {
    path: 'graficosAutor',
    component: GraficosComponent,
    pathMatch: 'full',
    canActivate: [AutoridadGuardService]
  },
  
  {
    path: 'pagenotfoud',
    component: PageNotFoundComponent
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
