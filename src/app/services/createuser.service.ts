import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable({
  providedIn: 'root'
})

export class createuser {
  private apiUrl = environment.apiBaseUrl;
  private apiurlQR = environment.apiBaseUrlQR;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(data: FormData) {
    return this.http.post(`${this.apiUrl}/InsideLoginInsertUser`, data);
  }

  // AssignedDropdown(a: String) {
  //   let url = `${this.apiUrl}/AssignedDropdown?optmode=${a}`;
  //   debugger;
  //   return this.http.get(url, { observe: 'response' });
  // }

  AssignedDropdown(a: string = '') {
    return this.http.get(`${this.apiUrl}/AssignedDropdown`, {
      params: { optmode: a }
    });
  }


}