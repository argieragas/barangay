import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CasesComponent } from './page/cases/cases.component';
import { OfficerComponent } from './page/officer/officer.component';
import { ReportComponent } from './page/report/report.component';
import { MapComponent } from './page/map/map.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    children: [
      {path:'',component: LoginComponent}
    ]
  },
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cases',
        component: CasesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'officers',
        component: OfficerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        component: ReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'map',
        component: MapComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
