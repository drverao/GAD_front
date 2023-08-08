
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SuperGuard } from './services/Guards/super.guard';
import { AutoridadGuardService } from './services/Guards/autoridad.guard';
import { RoleguardGuard } from './services/Guards/roleguard.guard';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { FenixComponent } from './pages/fenix/fenix.component';
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
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['RESPONSABLE', 'SUPERADMIN', 'ADMIN', 'AUTORIDAD'] }
  },
  

  //PATHS DE ADMINISTRADOR
  {
    path: '',
    loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule)
  },
  

  //PATHS DE SUPERADMIN

  {
    path: '',
    loadChildren: () => import("./pages/superadmin/superadmin.module").then(m => m.SuperadminModule)
  },
  


  
  {
    path: 'buscar',
    component: FenixComponent,
    pathMatch: 'full',
    canActivate: [SuperGuard]
  },
 
  
  
  //PATHS DE RESPONSABLE
  {
    path: '',
    loadChildren: () => import("./pages/responsable/responsable.module").then(m => m.ResponsableModule)
  },
  



  //PATHS DE AUTORIDAD
  {
    path: '',
    loadChildren: () => import("./pages/autoridad/autoridad.module").then(m => m.AutoridadModule)
  },
  
  //Otros Paths
  {
    path: 'userprofile',
    component: UserProfileComponent,
    pathMatch: 'full',
    canActivate: [RoleguardGuard],
    data: { allowedRoles: ['RESPONSABLE', 'SUPERADMIN', 'ADMIN', 'AUTORIDAD'] }
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
