import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {User} from './models/user';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {GenerateTokenComponent} from './generate-token/generate-token.component';
import {DoorsComponent} from './doors/doors.component';
import {QrCodeComponent} from './qr-code/qr-code.component';


const routes: Routes = [
  { path: '',   redirectTo: 'users', pathMatch: 'full' },
  { path: 'newUser', component: UserDetailComponent },
  { path: 'generateToken', component: GenerateTokenComponent },
  { path: 'getToken', component: QrCodeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'doors', component: DoorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
