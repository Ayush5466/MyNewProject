import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Ayush Agarwal';
  qrImageUrl: string | null = null;
  public showSidebar = false;
  result: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private Auth: AuthGuard
  ) { }

  ngOnInit(): void {
    history.pushState(null, '', window.location.href);
    console.log('Is Logged In:', this.Auth.isLoggedIn);
    debugger;
    // alert(this.Auth.isLoggedIn);
    this.showSidebar = this.Auth.isLoggedIn;
    window.addEventListener('popstate', () => {
      history.pushState(null, '', window.location.href);
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    history.pushState(null, '', window.location.href);
  }


  onGenerateQR() {
    const downloadFileName = 'MyQRCode.png';
    const a = 'a';
    this.loginService.CreateQR(a).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'image/png' });
        const url = window.URL.createObjectURL(blob);
        debugger;
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = downloadFileName;
        anchor.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('QR generation failed', err);
      }
    });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    debugger;
    this.showSidebar = false;
    this.router.navigate(['/login']).then(() => {
      window.history.pushState(null, '', window.location.href);
    });
  }
}
