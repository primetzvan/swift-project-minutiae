import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {User} from './models/user';
import {UserDetailComponent} from './users/user-detail/user-detail.component';


/*const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newUser', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/
export class AppRoutingModule {
}
