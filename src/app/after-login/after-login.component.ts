import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { RedirectCommand, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { LoginService } from '../services/login.service';
import { LoginComponent } from '../login/login.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})

export class AfterLoginComponent {

  result: any
  constructor(
    private LoginService: LoginService,
    private router: Router,
    private Auth: AuthGuard
  ) { }

  UserEmail: string | null = '';
  userRole: string | null = '';

  // ngAfterViewInit() {
  //   this.AfterLogin();
  // }

  currentDate: string = '';
  currentTime: string = '';
  currentDay: string = '';


  updateDateTime() {
    const now = new Date();

    this.currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    this.currentDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  gotoDashboard() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const GetEmail = localStorage.getItem('userEmail');
    const Getpassword = localStorage.getItem('userpassword');
    debugger;
    console.log('Is Logged In AfterLogin:', this.Auth.isLoggedIn);

    if (GetEmail) {
      this.UserEmail = GetEmail.split('@')[0];
      this.userRole = localStorage.getItem('userEmail');
    } else {
      this.UserEmail = '';
    }


    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // update every second
    this.FetchMenuData();
  }

  FetchMenuData() {
    this.LoginService.FetchMenuData('Data_Get?optmode=FetchMenuData').subscribe({
      next: (res) => {
        this.result = res;
        localStorage.setItem('menuData', JSON.stringify(this.result));
      },
      error: (err) => {
        console.error('❌ Error fetching menu data:', err);
      }
    });
  }


  selectGender: any;
  DropDownData: any[] = [];

  AfterLogin() {
    const token = localStorage.getItem("token");
    const a = 'Dropdown';
    let datachk = 'My Name Is Ayush Agarwal';
    var valueddata = datachk.split(' ');
    debugger;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    debugger;
    this.LoginService.AfterLogin(a, { headers }).subscribe({
      next: (res) => {
        const body = res.body;
        debugger;
        this.DropDownData = typeof body === 'string' ? JSON.parse(body) : body;
        if (this.DropDownData.length > 0) {
          this.selectGender = "";
        }
      }

    });
  }

  //CreateTicket

  CreateTicket() {
    this.router.navigate(['/createnewticket']);
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  CreateUserName() {
    this.router.navigate(['/createuser']);
  }

  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  gotoprofile() {
    this.router.navigate(['/profile']);
  }

  goToOpenTickets() {
    this.router.navigate(['/open-tickets']);
  }


}



