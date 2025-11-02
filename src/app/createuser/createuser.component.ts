import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { createuser } from '../services/createuser.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']   // ✅ plural
})
export class CreateuserComponent implements OnInit {
  result: any;
  user = {
    name: '',
    email: '',
    Gender: '',
    role: '',
    password: '',
    optmode: 'InsideLoginInsertUser'
  };

  receivedData: any;
  isEditMode: any;
  selectedFile: File | null = null;
  fileError: string = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CreateUser: createuser
  ) { }

  ngOnInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { data?: any } ?? history.state;
    const state = history.state;

    if (state?.data) {
      this.isEditMode = true;
      const parsedData1 = state.data;
      const parsedData = JSON.parse(parsedData1);

      this.user.name = parsedData[0].FullName;
      this.user.email = parsedData[0].Email;
      this.user.Gender = parsedData[0].Gender;
      this.user.password = parsedData[0].Password;
      this.user.role = parsedData[0].Role ?? "user";
    } else {
      this.isEditMode = false;
      console.log("Create Mode");
    }
  }

  successmsg: string = '';
  errmsg: string = '';

  onSubmit() {

    if (!this.user.name || !this.user.email || !this.user.role || !this.user.password) {
      this.errmsg = 'Please fill all required fields.';
      this.successmsg = '';
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.user.name);
    formData.append('Email', this.user.email);
    formData.append('Gender', this.user.Gender);
    formData.append('Role', this.user.role);
    formData.append('Password', this.user.password);
    formData.append('optmode', this.user.optmode);
    if (this.selectedFile) {
      formData.append('selectedFile', this.selectedFile, this.selectedFile.name);
    }
    
    this.CreateUser.createUser(formData).subscribe({
      next: (res: any) => {
        debugger;
        if (res.result > 0) {
          this.successmsg = res.message;
          this.errmsg = '';
          this.selectedFile = null;

          setTimeout(() => {
            window.location.reload();
          }, 3000);

        } else {
          this.errmsg = res.message || 'User already exists';
          this.successmsg = '';
        }
      },
      error: (err) => {
        debugger;
        this.errmsg = err.error.message;
        this.successmsg = '';
      }
    });
  }


  onFileSelected(event: any) {
    this.fileError = '';
    const file: File = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.fileError = 'Only JPG, JPEG, or PNG files are allowed.';
        event.target.value = ''; // reset file input
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file; // valid file
    }
  }

  btnCancel() {
    window.location.reload();
  }

}
