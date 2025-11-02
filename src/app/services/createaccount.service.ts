import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class createAccount {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getdropdwondata(optmode: string): Observable<any> {
        let url = `${this.apiUrl}/Data_Get?optmode=${optmode}`;
        return this.http.get(url, { observe: 'response' });
    }

    CreateDataSave(CreateModel: any, optmode: string) {
        let url = `${this.apiUrl}/CreateDataSave`;
        let a: any = { url, CreateModel, optmode };
        debugger;
        const payload = {
            ...CreateModel,
            optmode: optmode
        };
        // return this.http.post(url, payload, { observe: 'response' });
        return this.http.post<{ message: string; result: number }>(url, payload);
    }
}