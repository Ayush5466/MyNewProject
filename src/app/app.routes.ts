import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreatenewticketComponent } from './createnewticket/createnewticket.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ProfileComponent } from './profile/profile.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: '', redirectTo: 'birthday', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'createnewticket', component: CreatenewticketComponent, canActivate: [AuthGuard] },
    { path: 'createuser', component: CreateuserComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'birthday', component: BirthdayComponent, canActivate: [AuthGuard] }
];

// const routes: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     // { path: '', redirectTo: 'birthday', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent },
//     { path: 'create-account', component: CreateAccountComponent },
//     { path: 'createnewticket', component: CreatenewticketComponent },
//     { path: 'createuser', component: CreateuserComponent },
//     { path: 'profile', component: ProfileComponent },
//     { path: 'birthday', component: BirthdayComponent }
// ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}