import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AuthGuard, LoginGuard } from './guards/login.guard';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full',  resolve:{ resolveUser: UserResolver } },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, /* if logged in redirect to dashboard */
  { path: '', component: WrapperComponent, canActivate:[AuthGuard], children: [
    { path: 'dashboard', component:  DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
