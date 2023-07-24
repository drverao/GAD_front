import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperGuard } from 'src/app/services/Guards/super.guard';
import { DashboardComponent2 } from './pages/dashboard/dashboard.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { CriteriosSubcriterioComponent } from './pages/criterios-subcriterio/criterios-subcriterio.component';
import { CriteriosComponent } from './pages/criterios/criterios.component';
import { IndicadoresEvidenciaComponent } from './pages/indicadores-evidencia/indicadores-evidencia.component';
import { ObcervacionesComponent } from './pages/observaciones/obcervaciones.component';
import { SubcriteriosIndicadorComponent } from './pages/subcriterios-indicador/subcriterios-indicador.component';
import { RoleguardGuard } from 'src/app/services/Guards/roleguard.guard';
import { SubcriteriosComponent } from './pages/subcriterios/subcriterios.component';
import { IndicadorComponent } from './pages/indicador/indicador.component';
import { EvidenciasComponent } from './pages/evidencias/evidencias.component';
import { FormulasComponent } from './pages/formulas/formulas.component';
import { CuantitativaComponent } from './pages/cuantitativa/cuantitativa.component';
import { CuanlitativaComponent } from './pages/cuanlitativa/cuanlitativa.component';
import { EvidenciaAtrasadaComponent } from './pages/evidencia-atrasada/evidencia-atrasada.component';
import { CriterioReporteComponent } from './pages/criterio-reporte/criterio-reporte.component';
import { EvaluacionCuantitativaComponent } from './pages/evaluacion-cuantitativa/evaluacion-cuantitativa.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent2,
  pathMatch: 'full',
  canActivate: [SuperGuard]
}
  ,
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

}
  ,
{

  path: 'observaciones',
  component: ObcervacionesComponent,
  pathMatch: 'full',
  canActivate: [RoleguardGuard],
  data: { allowedRoles: ['SUPERADMIN', 'ADMIN'] }

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
  path: 'cualitativa',
  component: CuanlitativaComponent,
  pathMatch: 'full',
  canActivate: [SuperGuard]
},
{

  path: 'actividad-rechazada',
  component: EvidenciaAtrasadaComponent,
  pathMatch: 'full',
  //canActivate: [SuperGuard]
  canActivate: [RoleguardGuard],
  data: { allowedRoles: ['SUPERADMIN', 'ADMIN'] }

}
  ,
{
  path: 'formula',
  component: FormulasComponent,
  pathMatch: 'full',
  canActivate: [SuperGuard]
},
//Compartidas
{
  path: 'criterio_reporte',
  component: CriterioReporteComponent,
  pathMatch: 'full',
  canActivate: [RoleguardGuard],
  data: { allowedRoles: ['SUPERADMIN', 'ADMIN', 'AUTORIDAD'] }
},
{
  path: 'evaluacion-cuantitativa',
  component: EvaluacionCuantitativaComponent,
  pathMatch: 'full',
  canActivate: [SuperGuard]
},
{
  path: '',
  loadChildren: () => import("./modelo/modelo.module").then(m => m.ModeloModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule {

}
