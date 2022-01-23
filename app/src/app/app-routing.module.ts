import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './modules/auth/auth-login.guard';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeViewComponent } from './modules/core/home-view/home-view.component';
import { RateEditViewComponent } from './modules/rate/rate-edit-view/rate-edit-view.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent, canActivate: [AuthGuard] },
  // { path: 'logowanie', component: LoginComponent },
  {
    path: 'logowanie',
    component: AuthComponent,
    canActivate: [AuthLoginGuard],
  },
  { path: 'rejestracja', component: RegisterComponent },
  {
    path: 'wycena',
    component: RateEditViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
