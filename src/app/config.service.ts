import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: any;

    constructor(private http: HttpClient) { }

    loadConfig(): Promise<any> {
        return this.http.get('/config')
            .toPromise()
            .then((config) => {
                this.config = config;
            })
            .catch((err) => {
                console.error('Failed to load config from backend', err);
            });
    }

    get apiUrl(): string {
        return this.config?.apiUrl || '';
    }
}
