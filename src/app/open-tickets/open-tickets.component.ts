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
  selector: 'app-open-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './open-tickets.component.html',
  styleUrl: './open-tickets.component.css'
})
export class OpenTicketsComponent {

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private Auth: AuthGuard) {
  }
 
}
