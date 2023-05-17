
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
import { CrearUsuariosComponent } from './pages/superadmin/crear-usuarios/crear-usuarios.component';
import { CriteriosComponent } from './pages/superadmin/criterios/criterios.component';
import { SubcriteriosComponent } from './pages/superadmin/subcriterios/subcriterios.component';
import { IndicadorComponent } from './pages/superadmin/indicador/indicador.component';
import { EvidenciasComponent } from './pages/superadmin/evidencias/evidencias.component';
import { EvidenciasResponComponent } from './pages/responsable/evidencias/evidencias.component';
import { ConsultaActividadComponent } from './pages/autoridad/consulta-actividad/consulta-actividad.component';
import { ReportesComponent } from './pages/autoridad/reportes/reportes.component';
import { AsignaComponent } from './pages/admin/asigna/asigna.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CriteriosSubcriterioComponent } from './pages/superadmin/criterios-subcriterio/criterios-subcriterio.component';
import { SubcriteriosIndicadorComponent } from './pages/superadmin/subcriterios-indicador/subcriterios-indicador.component';
import { ObcervacionesComponent } from './pages/superadmin/observaciones/obcervaciones.component';
import { NormalGuard } from './services/Guards/normal.guard';
import { SuperGuard } from './services/Guards/super.guard';
import { AutoridadGuardService } from './services/Guards/autoridad.guard';
import { RoleguardGuard } from './services/Guards/roleguard.guard';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';

import { AprobarRechazarAdminComponent } from './pages/admin/aprobar-rechazar-admin/aprobar-rechazar-admin.component';
import { ActividadAutoridadComponent } from './pages/autoridad/actividad_autoridad/actividad-autoridad.component';
import { FormulasComponent } from './pages/superadmin/formulas/formulas.component';
import { CuantitativaComponent } from './pages/superadmin/cuantitativa/cuantitativa.component';
import { CuanlitativaComponent } from './pages/superadmin/cuanlitativa/cuanlitativa.component';
import { AsignacionEvidenciaComponent } from './pages/admin/asignacion-evidencia/asignacion-evidencia.component';

import { InicioModeloComponent } from './pages/superadmin/modelo/inicio-modelo/inicio-modelo.component';
import { DialogoModeloComponent } from './pages/superadmin/modelo/dialogo-modelo/dialogo-modelo.component';
import { DetalleModeloComponent } from './pages/superadmin/modelo/detalle-modelo/detalle-modelo.component';
import { FenixComponent } from './pages/fenix/fenix.component';
import { EvaluacionCualitativaComponent } from './pages/superadmin/indicadores-evaluacion/evaluacion-cualitativa/evaluacion-cualitativa.component';
import { EvaluacionCuantitativaComponent } from './pages/superadmin/indicadores-evaluacion/evaluacion-cuantitativa/evaluacion-cuantitativa.component';

import { DetalleSubcriterioComponent } from './pages/superadmin/modelo/detalle-subcriterio/detalle-subcriterio.component';
import { DetalleIndicadorComponent } from './pages/superadmin/modelo/detalle-indicador/detalle-indicador.component';
import { IndicadoresEvidenciaComponent } from './pages/superadmin/indicadores-evidencia/indicadores-evidencia.component';
import { ListDetalleEvaluacionComponent } from './pages/admin/list-detalle-evaluacion/list-detalle-evaluacion.component';
import { EvidenciaTareasAsginadasComponent } from './pages/responsable/evidencia-tareas-asginadas/evidencia-tareas-asginadas.component';
import { ActividadesResponsableComponent } from './pages/responsable/actividades-responsable/actividades-responsable.component';
import { AprobarRechazarDetalleAdminComponent } from './pages/admin/aprobar-rechazar-detalle-admin/aprobar-rechazar-detalle-admin.component';
import { GraficosComponent } from './pages/autoridad/graficos/graficos.component';
import { DashboardComponent2 } from './pages/superadmin/dashboard/dashboard.component';
import { CriterioReporteComponent } from './pages/superadmin/criterio-reporte/criterio-reporte.component';



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
    data: { allowedRoles: ['RESPONSABLE', 'SUPERADMIN', 'ADMIN'] }
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
    canActivate: [AdminGuard]
  },
  {
    path: 'asignaEvidencia',
    component: AsignacionEvidenciaComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]

  },
  {
    path: 'listdetalle',
    component: ListDetalleEvaluacionComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]

  },

  //PATHS DE SUPERADMIN
  {
    path: 'detalle-subcriterio',
    component: DetalleSubcriterioComponent,
    pathMatch: 'full',
    //canActivate: [SuperGuard]
  },
  {
    path: 'detalle-indicador',
    component: DetalleIndicadorComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'usuarios',
    component: CrearUsuariosComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'criterioSuper',
    component: CriteriosComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'criterios-subcriterio',
    component: CriteriosSubcriterioComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'indicador-evidencia',
    component: IndicadoresEvidenciaComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path:'evaluacion-cualitativa',
    component:EvaluacionCualitativaComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  }
  ,
  {
    path:'evaluacion-cuantitativa',
    component:EvaluacionCuantitativaComponent,
    pathMatch:'full',
    canActivate:[SuperGuard]
  },
  {
    path: 'observaciones',
    component: ObcervacionesComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  }
  ,
  {
    path: 'subcriterios-indicador',
    component: SubcriteriosIndicadorComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  }
  ,
  {
    path: 'subcriterioSuper',
    component: SubcriteriosComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'indicadoreSuper',
    component: IndicadorComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'evidenciaSuper',
    component: EvidenciasComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },

  {
    path: 'modelo',
    component: InicioModeloComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'formula',
    component: FormulasComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'cuantitativa',
    component: CuantitativaComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'detallemodelo',
    component: DetalleModeloComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
  {
    path: 'buscar',
    component: FenixComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]

  }

  //PATHS DE RESPONSABLE,
  ,
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
    path: 'formula',
    component: FormulasComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
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
    pathMatch:'full',
    canActivate:[AutoridadGuardService]
  },
  //Compartidas
  {
    path: 'criterio_reporte',
    component: CriterioReporteComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['SUPERADMIN', 'ADMIN'] }
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
