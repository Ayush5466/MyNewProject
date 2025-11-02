import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, afterNextRender } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { RedirectCommand, Router, RouterModule } from '@angular/router';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  result: any
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  userEmail: string = '';
  userName: string = '';
  joinDate: string = '';
  userpassword: string = '';
  GetFilePath: string = '';

  ngOnInit(): void {
    const GetEmail = localStorage.getItem('userEmail');//userEmail
    const Getpassword = localStorage.getItem('userpassword');
    this.userpassword = Getpassword || '';
    this.userEmail = GetEmail || '';
    this.View_ProfileData(this.userEmail, this.userpassword);
  }

  View_ProfileData(editdata: string, Getpassword: string) {
    this.loginService.View_ProfileData(editdata, Getpassword).subscribe({
      next: (res: any) => {
        debugger;
        if (res.result > 0) {
          let AllData = JSON.parse(res.data);
          const filePath = AllData[0].FilePath;
          this.GetFilePath = filePath;
          this.userEmail = AllData[0].Email;
          this.userpassword = AllData[0].Password;
          this.userName = AllData[0].FullName;
          this.joinDate = AllData[0].EntryDate.split('T')[0];
        }

      }
    })
  }





  backafterlogin() {
    this.router.navigate(['/after-login']);
  }

  EditProfile() {
    this.router.navigate(['/createuser']);
  }

  EditProfile1(editdata: string, Getpassword: string) {
    this.loginService.EditProfile1(editdata, Getpassword).subscribe({
      next: (res) => {
        if (res.result == 1) {
          const Alldata = JSON.parse(res.data);
          this.router.navigate(['/createuser'], { state: { data: JSON.stringify(Alldata) } });
        }
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }








}
