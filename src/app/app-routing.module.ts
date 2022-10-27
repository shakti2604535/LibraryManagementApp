import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'home', canActivate:[AuthGuard], loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(private service:LoginService){
    // service.logout()

  }
}
