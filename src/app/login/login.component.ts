import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RedirectCommand, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { error } from 'jquery';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  result: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private Auth: AuthGuard
  ) { }

  public showSidebar = false;
  //Starts My Practise Code

  // class Student {
  //   FullName: string;
  //   readonly LastName: string;

  //   constructor(name1: string, name2: string) {
  //     this.FullName = name1;
  //     this.LastName = name2;
  //   }
  // }

  // export class LoginComponent extends Student {
  //   result: any;
  //   //num12: number | string = 10;
  //   constructor(
  //     private loginService: LoginService,
  //     private router: Router
  //   ) {
  //     //this.num12 = 'hello';
  //     super("Ayush", "Agarwal");
  //   }

  // PractiseTime(name: string, gender: boolean, age?: number) {
  //   debugger;

  //   if (name === undefined || gender === undefined) {
  //     const missing = name === undefined ? "name" : "gender";
  //     throw new Error(`Parameter '${missing}' is required`);
  //   }

  //   alert('Hey Ayush');
  // }

  //End My Practise Code

  fetchLoginData() {
    this.loginService.getLoginData('Data_Get?optmode=Data_Get').subscribe({
      next: (res) => {
        this.result = res;
      },
      error: (err) => {
        console.error('Error fetching login data:', err);
      }
    });
  }


  loginModel = {
    Login: '',
    Password: ''
  };

  Saving() {
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const passwordElement = document.getElementById('password') as HTMLInputElement;

    let email: string = emailElement?.value || '';
    let password: string | number = passwordElement?.value || '';

    this.loginModel.Login = email;
    this.loginModel.Password = password;
    debugger;
    this.loginService.SaveLoginData(this.loginModel).subscribe({
      next: (res) => {
        this.result = res;
        console.log(res);
      }
    });
  }

  errmsg: string = '';
  loginToken(email: string, password: string): void {

    if (!email || !password) {
      let missingFields = [];
      if (!email) missingFields.push('Email');
      if (!password) missingFields.push('Password');
      alert('Please enter: ' + missingFields.join(', '));
      return;
    }

    this.loginService.loginService(email, password).subscribe({
      next: (res) => {
        // alert('AYUSH');
        debugger;
        if (res?.token) {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userpassword', password);

          this.loginService.saveToken(res.token);     // Save token          
          this.loginService.startAutoLogout();
          this.router.navigate(['/after-login']);

        } else {
          console.error('Token not received.');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        debugger;
        localStorage.setItem('token', 'token');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userpassword', password);
        if (err.status === 401) {
          this.errmsg = err.error.message;
        }
        else {
          this.errmsg = 'Something went wrong. Please try again later.';
          this.router.navigate(['/after-login']);
        }

        // this.router.navigate(['/login']);
        // this.router.navigate(['/after-login']);
      }
    });
  }


  // ngOnInit(): void {
  //   (window as any).PractiseTime = this.PractiseTime;
  // }

  ngOnInit(): void {
    debugger;
    console.log('Is Logged In:', this.Auth.isLoggedIn);
    // alert(this.Auth.isLoggedIn);
    this.showSidebar = false;
    this.Auth.logout();
  }

  // ngOnInit(): void {
  //   (window as any).loginToken = this.loginToken.bind(this);
  //   const token = this.loginService.getToken();
  //   if (token) {
  //     this.callAllApiData(); // 🔁 Call everything in one shot
  //   }
  //   (window as any).callAllApiData = this.callAllApiData.bind(this);
  // }

  // callAllApiData(): void {
  //   const calls = [
  //     // this.getdata(),
  //     // this.getStudents(),
  //     // this.getCourses(),
  //     // this.getDepartments(),
  //     // this.getSettings(),
  //     // this.getNotifications(),
  //     // this.getRoles(),
  //     // this.getPermissions(),
  //     // this.getSubjects(),
  //     // this.getAttendance()
  //   ];
  // }



  // SelectGender: any;
  // dropdownData: any[] = [];
  // getdata() {
  //   const a = 'Dropdown';
  //   this.loginService.getdropdwondata(a).subscribe({
  //     next: (res) => {
  //       try {
  //         // If res is a string, parse it
  //         this.dropdownData = typeof res === 'string' ? JSON.parse(res) : res;
  //         console.log('Dropdown data parsed:', this.dropdownData);
  //       } catch (e) {
  //         this.dropdownData = [];
  //       }
  //     }
  //   });
  // }


  // ngAfterViewInit() {
  //   debugger;
  //   this.getdata();
  // }

  // datafetch = {
  //   data: 0
  // }

  // goToRegister() {    
  //   this.router.navigate(['/create-account']);
  //   let a: number = 1;
  //   this.datafetch.data = a;
  // }
  @Output() clickCreate = new EventEmitter<void>();

  createAccount() {
    this.clickCreate.emit(); // Calls goToRegister in parent
  }

}

// const s1 = new Student("Ayush", "Agarwal");
// console.log(s1.FullName);

// s1.FullName = "Hey";
