import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = environment.apiBaseUrl;
  private apiurlQR = environment.apiBaseUrlQR;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getLoginData(optmode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${optmode}`);
  }

  SaveLoginData(loginModel: any) {
    let url = `${this.apiUrl}/Data_Save`;
    let a: any = { url, loginModel };
    return this.http.post(url, loginModel);
  }

  getdropdwondata(optmode: string): Observable<any> {
    let url = `${this.apiUrl}/Data_Get?optmode=${optmode}`;
    return this.http.get(url);
  }

  loginService(username: string, password: string): Observable<any> {
    const body = { login: username, password: password, optmode: 'Data_Get' };
    return this.http.post<any>(`${this.apiUrl}/Token_Generate`, body);
    // const body = { login: username, password: password, optmode: 'Data_Get' };
    // return this.http.post<any>(`${this.apiUrl}/Data_Save`, body);
  }

  //Only For QR Start

  CreateQR(a: string) {
    const url = `${this.apiurlQR}/DownloadQRCode/download?text=${a}`;
    debugger;
    return this.http.get(url, { responseType: 'blob' });
  }

  //Only For Qr End

  // saveToken(token: string) {
  //   localStorage.setItem('jwtToken', token);
  // }

  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  //   const jwtPayload = JSON.parse(atob(token.split('.')[1]));
  //   const expiryInMilliseconds = jwtPayload.exp * 1000000;
  //   debugger;
  //   localStorage.setItem('token_expiry', expiryInMilliseconds.toString());
  // }


  saveToken(token: string) {
    localStorage.setItem('token', token);
    const now = Date.now(); // current time in ms
    const oneHourLater = now + 60 * 60 * 1000; // 1 hour in ms
    localStorage.setItem('token_expiry', oneHourLater.toString());
  }



  startAutoLogout() {
    const expiry = localStorage.getItem('token_expiry');
    if (expiry) {
      const expiresIn = +expiry - Date.now();
      if (expiresIn > 0) {
        setTimeout(() => {
          this.logout();
        }, expiresIn);
      } else {
        this.logout(); // Token already expired
      }
    }
  }


  logout() {
    debugger;
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    this.router.navigate(['/login']);
  }


  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }


  //AfterLogin API
  AfterLogin(optmode: string, options: any): Observable<any> {
    const url = `${this.apiUrl}/AfterLogin?optmode=${optmode}`;
    debugger;
    return this.http.get(url, {
      ...options,
      observe: 'response' as const
    });
  }


  // EditProfile1(username: string, password: string): Observable<any> {
  //   const body = { login: username, password: password, optmode: 'EditProfile_Get' };
  //   debugger;
  //   return this.http.post<any>(`${this.apiUrl}/EditProfile`, username, password, "EditProfile_Get");
  // }

  EditProfile1(username: string, password: string): Observable<any> {
    let a = 'EditProfile_Get';
    return this.http.get<any>(
      `${this.apiUrl}/EditProfile?username=${username}&password=${password}&optmode=${a}`
    );
  }


  View_ProfileData(username: string, password: string): Observable<any> {
    let a = 'View_ProfileData';
    return this.http.get<any>(
      `${this.apiUrl}/EditProfile?username=${username}&password=${password}&optmode=${a}`
    );
  }

}
