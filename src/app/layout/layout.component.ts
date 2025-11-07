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

}
