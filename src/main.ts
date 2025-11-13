import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { CreateAccountComponent } from './app/create-account/create-account.component';
import { AfterLoginComponent } from './app/after-login/after-login.component';
import { QrComponent } from './app/qr/qr.component';
import { CreatenewticketComponent } from './app/createnewticket/createnewticket.component';
import { CreateuserComponent } from './app/createuser/createuser.component';
import { ProfileComponent } from './app/profile/profile.component';
import { BirthdayComponent } from './app/birthday/birthday.component';
import { SidebarComponent } from './app/components/sidebar/sidebar.component';
import { LayoutComponent } from './app/layout/layout.component';
import { OpenTicketsComponent } from './app/open-tickets/open-tickets.component';
import { AuthGuard } from './app/auth.guard';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule),
//     // provideRouter([
//     //   { path: '', redirectTo: 'login', pathMatch: 'full' },
//     //   // { path: '', redirectTo: 'birthday', pathMatch: 'full' },
//     //   { path: 'login', component: LoginComponent },
//     //   { path: 'create-account', component: CreateAccountComponent },
//     //   { path: 'after-login', component: AfterLoginComponent },
//     //   { path: 'qr', component: QrComponent },
//     //   { path: 'createnewticket', component: CreatenewticketComponent },
//     //   { path: 'createuser', component: CreateuserComponent },
//     //   { path: 'profile', component: ProfileComponent },
//     //   { path: 'birthday', component: BirthdayComponent }
//     // ])

//     provideRouter([
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: LoginComponent },
//       { path: 'create-account', component: CreateAccountComponent },
//       { path: 'after-login', component: AfterLoginComponent, canActivate: [AuthGuard] },
//       { path: 'qr', component: QrComponent, canActivate: [AuthGuard] },
//       { path: 'createnewticket', component: CreatenewticketComponent, canActivate: [AuthGuard] },
//       { path: 'createuser', component: CreateuserComponent, canActivate: [AuthGuard] },
//       { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
//       // { path: 'birthday', component: BirthdayComponent, canActivate: [AuthGuard] }
//       { path: 'birthday', component: BirthdayComponent }
//       //,{ path: 'app-sidebar', component: SidebarComponent, canActivate: [AuthGuard] }
//     ])
//   ]
// });


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },

      {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'createuser', component: CreateuserComponent },
          { path: 'createnewticket', component: CreatenewticketComponent },
          { path: 'qr', component: QrComponent },
          { path: 'after-login', component: AfterLoginComponent },
          { path: 'birthday', component: BirthdayComponent },
          { path: 'open-tickets', component: OpenTicketsComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
      },

      { path: '**', redirectTo: 'login' }
    ])
  ]
});
