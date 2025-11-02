// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { NgIf } from '@angular/common';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//     constructor(private router: Router) { }

//     canActivate(): boolean {
//         const token = localStorage.getItem('token');
//         console.log("AuthGuard triggered, token =", token);

//         if (token && token.trim() !== '') {
//             return true;
//         } else {
//             localStorage.removeItem('token');
//             this.router.navigate(['/login']); // redirect to login
//             return false;
//         }
//     }
// }

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//     constructor(private router: Router) { }

//     canActivate(): boolean {

//         if (this.checkToken()) {
//             return true;
//         } else {
//             localStorage.removeItem('token');
//             this.router.navigate(['/login']); // redirect to login
//             return false;
//         }
//     }

//     checkToken(): boolean {
//         const token = localStorage.getItem('token');
//         return !!(token && token.trim() !== '');
//     }

//     get isLoggedIn(): boolean {
//         return this.checkToken();
//     }

//     logout() {
//         localStorage.removeItem('token');        
//     }

// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private loggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
    isLoggedIn$ = this.loggedInSubject.asObservable();

    constructor(private router: Router) { }

    canActivate(): boolean {
        if (this.checkToken()) {
            return true;
        } else {
            this.logout();
            this.router.navigate(['/login']);
            return false;
        }
    }

    checkToken(): boolean {
        const token = localStorage.getItem('token');
        return !!(token && token.trim() !== '');
    }

    get isLoggedIn(): boolean {
        return this.checkToken();
    }

    // call this after successful login
    login(token: string) {
        localStorage.setItem('token', token);
        this.loggedInSubject.next(true); // notify subscribers
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedInSubject.next(false); // notify subscribers
    }
}
