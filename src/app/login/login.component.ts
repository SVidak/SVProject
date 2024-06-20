import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const email = localStorage.getItem('email');
    const loggedIn = localStorage.getItem('loggedIn');

    if (email && loggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.get<boolean>('http://localhost:8080/user/logIn', { params: { email: loginData.email, password: loginData.password } })
        .subscribe(response => {
          if (response) {
            console.log('Login successful');
            localStorage.setItem('email', loginData.email);
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['/home']);
          } else {
            console.log('Login failed');
            alert('Login failed');
          }
        }, error => {
          console.error('Error logging in', error);
          alert('An error occurred');
        });
    } else {
      alert('Login failed');
    }
  }
}
