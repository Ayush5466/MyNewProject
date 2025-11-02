import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { createAccount } from '../services/createaccount.service';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  result: any;
  constructor(
    private loginService: createAccount,
    private router: Router
  ) { }


  SelectGender: any;
  dropdownData: any[] = [];

  getdata() {
    this.dropdownData = [
      { ID: '1', GENDER: 'Male' },
      { ID: '2', GENDER: 'Female' },
      { ID: '3', GENDER: 'Other' }
    ];
    this.SelectGender = '';
  }

  // getdata() {
  //   const a = 'Dropdown';
  //   this.loginService.getdropdwondata(a).subscribe({
  //     next: (res) => {
  //       const statusCode = res.status;
  //       const statusText = res.statusText;
  //       try {
  //         const body = res.body;
  //         this.dropdownData = typeof body === 'string' ? JSON.parse(body) : body;
  //         if (this.dropdownData.length > 0) {
  //           // this.SelectGender = this.dropdownData[0].ID;
  //           this.SelectGender = "";
  //         }
  //       } catch (e) {
  //         console.error('Parsing error:', e);
  //         this.dropdownData = [];
  //       }
  //     }
  //   });
  // }

  ngAfterViewInit() {
    this.getdata();
  }

  //Data Save

  // ngOnInit() {
  //   const today = new Date();
  //   debugger;
  //   const yyyy = today.getFullYear();
  //   const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  //   const dd = String(today.getDate()).padStart(2, '0');

  //   this.Age = `${dd}-${mm}-${yyyy}`; // Format: "YYYY-MM-DD"
  // }

  // chkvalid(){
  //   this.Email != "" || this.Email != null;
  //   this.Password != "" || this.Password != null;
  //   this.SelectGender != "" || this.SelectGender != null || this.SelectGender != 0;
  //   this.Age != "" || this.Age != null;
  //    $("#savebtn").click();
  // }

  CreateModel = {
    Email: "",
    passWord: "",
    Gender: "",
    Age: "",
    name: ""
  }

  Email: string = '';
  Password: string = '';
  Gender: string = '';
  Age: string = '';
  name: string = '';

  CreatepagedataSavechk(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const emailDomain = this.Email.split('@')[1];
    if (!emailDomain || !emailDomain.includes('.')) {
      alert('Email domain is not valid.');
      return;
    }
    this.CreatepagedataSave();
  }

  successmsg: string = '';
  CreatepagedataSave() {
    // const EmailElement = document.getElementById("Email") as HTMLInputElement;
    // const passWordElement = document.getElementById("Password") as HTMLInputElement;
    // const GenderElement = document.getElementById("SelectGender") as HTMLSelectElement;
    // const Age = document.getElementById("Age") as HTMLInputElement; 

    // this.Email = EmailElement?.value || "";
    // this.Password = passWordElement?.value || "";
    // this.Gender = GenderElement?.value || "";
    // this.Age = Age?.value || "";
    // debugger;

    this.CreateModel = {
      Email: this.Email,
      passWord: this.Password,
      Gender: this.SelectGender,
      Age: this.Age,
      name: this.name
    };
    const a = 'CreateDataSave';
    debugger;
    this.loginService.CreateDataSave(this.CreateModel, a).subscribe({
      next: (res) => {
        debugger;
        const message = res.message;
        const result = res.result;
        this.successmsg = message;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

}
