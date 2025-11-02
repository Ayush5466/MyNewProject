import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, afterNextRender } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { RedirectCommand, Router, RouterModule } from '@angular/router';
import { createuser } from '../services/createuser.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-createnewticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './createnewticket.component.html',
  styleUrl: './createnewticket.component.css'
})
export class CreatenewticketComponent {
  ticket: any = {
    subject: '',
    description: '',
    priority: '',
    category: '',
    assignedTo: ''

  };

  result: any;
  constructor(
    private router: Router,
    private CreateUser: createuser
  ) { }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log('Ticket Data:', this.ticket);
    console.log('Selected File:', this.selectedFile);
  }

  persons: any[] = [];
  successmsg: string = '';
  errmsg: string = '';

  ngOnInit(){
    this.CreateUser.AssignedDropdown("AssignedDropdown").subscribe({
      next: (res: any) => {
        if (res.result > 0) {
          this.persons = JSON.parse(res.data);
          this.successmsg = res.message;
        } else {
          this.errmsg = res.message;
        }
      },
      error: (err) => {
        this.errmsg = "Error fetching dropdown data";
        console.error(err);
      }
    })
  }

}
