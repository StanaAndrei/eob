import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpService } from '../../services/http.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [AuthService, HttpService]
})
export class SignInComponent {
    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    loginForm = this.formBuilder.group({
        email: 'andrew@gmail.com',
        password: 'password',
    })

    login() {
        const {
            email,
            password,
        } = this.loginForm.value;
        if (!email || !password) {
            return alert('error!');
        }
        this.authService.login(email, password);        
    }
}
