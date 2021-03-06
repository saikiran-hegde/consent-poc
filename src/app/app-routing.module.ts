import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { UserLookupComponent } from './containers/lookup/user-lookup.component';

function onAuthRequired(oktaAuth, injector): void {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-lookup',
    component: UserLookupComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-lookup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
