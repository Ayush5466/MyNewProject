import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  result: any;
  UserEmail: string | null = '';
  userRole: string | null = '';

  currentDate: string = '';
  currentTime: string = '';
  currentDay: string = '';


  updateDateTime() {
    const now = new Date();

    this.currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    this.currentDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private Auth: AuthGuard) {
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    if (window.innerWidth <= 768) {
      this.isMenuOpen = false;
    }
  }

  gotoDashboard() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  gotoprofile() {
    this.router.navigate(['/profile']);
  }

  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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

  }


}
