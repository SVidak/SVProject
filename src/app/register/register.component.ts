import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  error: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.http.post<any>('http://localhost:8080/user/signIn', registerData)
        .pipe(
          catchError(error => {
            this.error = error.error.message || 'An error occurred';
            return throwError(this.error);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}